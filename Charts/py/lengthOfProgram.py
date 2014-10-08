# -*- coding: utf-8 -*-
"""
lengthOfPrograms.py

Created on Thu Oct  2 07:30:42 2014

@author: jduckwor
"""

import psycopg2 as ps, json

db = 'EEAssessmentTool'
hst = 'localhost'

outputJSON = r'/Users/jduckwor/Documents/EEMapping/BCEE2/WebApps/Charts/assets/data/programLength.json'

breaks = [0, 1, 2, 3, 4, 5, 10, 50]
organizations = ('CalWood', 'Thorne Nature Experience', 'Eco-Cycle')
grades = ('P', 'K', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12')

data = dict(categories=[])
for i in range(len(breaks)-1):
    rangeString = str(breaks[i]) + '-' + str(breaks[i+1])
    data['categories'].append(rangeString)

for grade in grades:
    data[grade] = {}

#Create connection
conn = ps.connect(database=db, host=hst, user='postgres', password='password')
if conn is not None:
    #Set up cursor    
    cur = conn.cursor()
    
    for grade in grades:
        
        #Set up data object for each grade
        data[grade] = {}
        data[grade]['Other Orgs'] = []
        for organization in organizations:
            data[grade][organization] = []
#        print(grade)
        
        try:    
            for i in range(len(breaks)-1):
                low = breaks[i]
                top = breaks[i+1]      
                
                #Get total hours for each bin
                cur.execute('SELECT sum(hours) FROM year2013.programlength WHERE (grade = %s ' +
                'AND hours > %s AND hours <= %s)', (grade, low, top, ))
                totalHours = cur.fetchone()[0]
                if totalHours is None:
                    totalHours = 0
                totalOrgHours = 0
                
                #Get total hours per organization for each bin
                for organization in organizations:
#                    print(organization + " " + str(low) + "-" + str(top))
                    cur.execute('SELECT sum(hours) FROM year2013.programlength WHERE (grade = %s ' + 
                    'AND hours > %s AND hours <= %s AND organization = %s)', (grade, low, top, organization, ))
                    orgHours = cur.fetchone()[0]
                    if orgHours is None:
                        orgHours = 0
                    data[grade][organization].append(round(orgHours, 1))
                    totalOrgHours += orgHours
                
                #Add 'Other Orgs' category
                data[grade]['Other Orgs'].append(round(totalHours - totalOrgHours, 1))
        
        except Exception, e:
            print("Unable to get total hours...")            
            print(e)
            pass
                
    del cur
else:
    print("Unable to connect to {0} on server {1}".format(db, hst))

del conn
with open(outputJSON, 'w') as outfile:
    json.dump(data, outfile, indent = 4)