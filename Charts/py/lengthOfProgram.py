# -*- coding: utf-8 -*-
"""
lengthOfPrograms.py

Created on Thu Oct  2 07:30:42 2014

@author: jduckwor
"""

import psycopg2 as ps, json

db = 'EEAssessmentTool'
hst = 'localhost'

outputJSON = r'/Users/Shared/htdocs/BCEECollaborative/Charts/assets/data/programLength.json'

breaks = [0, 1, 2, 3, 4, 5, 10, 50]
organizations = (('CalWood', ('All',)), ('Thorne Nature Experience', ('Thorne BVSD 4th grade Field Trip', 'All',)), ('Eco-Cycle', ('All',)))
grades = ('P', 'K', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12')

data = dict(categories=[])
for i in range(len(breaks)-1):
    rangeString = str(breaks[i]) + '-' + str(breaks[i+1])
    data['categories'].append(rangeString)

#Create connection
conn = ps.connect(database=db, host=hst, user='postgres', password='password')
if conn is not None:
    #Set up cursor    
    cur = conn.cursor()
    
    for grade in grades:
        
        #Set up data object for each grade
        data[grade] = {}
        data[grade]['Other Orgs'] = {'name': 'Other Orgs', 'data': []}
        for organization in organizations:
            if (len(organization[1]) == 1) & ('All' in organization[1]):
                data[grade][organization[0]] = {'name': organization[0], 'data': []}
            elif len(organization[1]) > 1:
                for program in organization[1]:
                    if program != 'All':
                        programString = organization[0] + ': ' + program
                        data[grade][programString] = {'name': programString, 'data': []}
                    elif program == 'Thorne BVSD 4th grade Field Trip':
                        programString = organization[0] + '4th Gr. Field Trip'
                    else:
                        programString = organization[0] + ': ' + 'All Other Programs'
                        data[grade][programString] = {'name': programString, 'data': []}
#        print(grade)
        
        for i in range(len(breaks)-1):
            low = breaks[i]
            top = breaks[i+1]      
            try:
                #Get total hours for each bin
                cur.execute('SELECT sum(hours) FROM year2013.programlength WHERE (grade = %s ' +
                'AND hours > %s AND hours <= %s)', (grade, low, top, ))
                totalHours = cur.fetchone()[0]
                if totalHours is None:
                    totalHours = 0
                totalOrgHours = 0
            except Exception, e:
                print("could not get total hours for each bin")
                print(e)
            
            #Get total hours per organization for each bin
            for organization in organizations:
                try:
                    cur.execute('SELECT sum(hours) FROM year2013.programlength WHERE (grade = %s ' + 
                        'AND hours > %s AND hours <= %s AND organization = %s)', (grade, low, top, organization[0], ))
                    orgHours = cur.fetchone()[0]                    
                    if orgHours is None:
                        orgHours = 0
                except Exception, e:
                    print("Could not get total hours for organization {0}".format(organization[0]))
                    print(e)
                        
                #Test for number of programs
                programs = organization[1]
                print(organization[0] + "- " + str(len(programs)))
                
                if (len(programs) == 1 ) & (programs[0] == 'All'):
                    data[grade][organization[0]]['data'].append(orgHours)
                    totalOrgHours += orgHours
                elif (len(programs) > 1) & ('All' in programs):
                    indProgHrs = 0
                    for program in programs:
                        if program != 'All':
                            
                            #Create ID string for organization and program
                            programString = organization[0] + ': ' + program
                            
                            cur.execute('SELECT sum(hours) FROM year2013.programlength WHERE (grade = %s ' + 
                            'AND hours > %s AND hours <= %s AND organization = %s AND program = %s)', (grade, low, top, organization[0], program, ))
                            progHours = cur.fetchone()[0]
                            if progHours is None:
                                progHours = 0
                            data[grade][programString]['data'].append(progHours)
                            totalOrgHours += progHours
                            indProgHrs += progHours
                    programString = organization[0] + ': All Other Programs'

                    data[grade][programString]['data'].append(round(orgHours - indProgHrs))
                else:
                    for program in programs:
                       
                       #Create ID string for organization and program
                        programString = organization[0] + ': ' + program
                        
                        cur.execute('SELECT sum(hours) FROM year2013.programlength WHERE (grade = %s ' + 
                        'AND hours > %s AND hours <= %s AND organization = %s AND program = %s)', (grade, low, top, organization[0], program, ))
                        orgHours = cur.fetchone()[0]
                        if orgHours is None:
                            orgHours = 0
                        data[grade][programString]['data'].append(round(orgHours, 1))
                        totalOrgHours += orgHours
                    
            #Add 'Other Orgs' category
            data[grade]['Other Orgs']['data'].append(round(totalHours - totalOrgHours, 1))
            
    del cur
else:
    print("Unable to connect to {0} on server {1}".format(db, hst))

del conn
with open(outputJSON, 'w') as outfile:
    json.dump(data, outfile, indent = 4)