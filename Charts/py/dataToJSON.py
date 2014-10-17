# -*- coding: utf-8 -*-
"""
Created on Wed Oct 15 17:43:33 2014

@author: jduckwor
"""

import psycopg2 as ps, json

db = 'EEAssessmentTool'
hst = 'localhost'
usr = 'postgres'
pw = 'password'

schema = 'year2013'
table = 'resourceapplications'

jsonObject = {'data': [], 'schools': [], 'organizations': []}

orgField = 'organization'
organizations = []
schoolField = 'school'
schools = []

outputJSON = r'/Users/Shared/htdocs/BCEECollaborative/Charts/assets/data/overallData.json'

# Open connection to database
try:
    conn = ps.connect(host=hst, user=usr, password=pw, dbname=db)
except Exception, e:
    print('Could not connect to {0} on {1}'.format(db, hst))
    print(e)
    
if conn is not None:
    # Create cursor
    cur = conn.cursor()
    
    # Create SQL string
    SQL = 'SELECT row_to_json(' + table + ') FROM ' + schema + '.' + table + ';'
    cur.execute(SQL)
    
    # Loop through all JSON rows and add to object
    while True:
        row = cur.fetchone()
        if row is None:
            break
        jsonObject['data'].append(row[0])

# Populate list of organizations
for row in jsonObject['data']:
    if row[orgField] not in organizations:
        organizations.append(row[orgField])
jsonObject['organizations'] = organizations

# Populate list of schools
for row in jsonObject['data']:
    if row[schoolField] not in schools:
        jsonObject['schools'].append({"label": row[schoolField], "value": row[schoolField]})
        schools.append(row[schoolField])

# Write JSON object to file
with open(outputJSON, 'w') as outfile:
    json.dump(jsonObject, outfile, indent = 4)
    
    


