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

jsonArray = []
outputJSON = r'/Users/Shared/htdocs/BCEECollaborative/Charts/assets/data/overallData.json'

fieldList = []
gidList = []
# Open connection to database
try:
    conn = ps.connect(host=hst, user=usr, password=pw, dbname=db)
except Exception, e:
    print('Could not connect to {0} on {1}'.format(db, hst))
    print(e)
    
if conn is not None:
    # Create cursor
    cur = conn.cursor()
    
    try:
        # Get column names
        columnsSQL = "SELECT column_name FROM information_schema.columns WHERE (table_schema = '" + \
        schema + "' AND table_name = '" + table + "');"  
        cur.execute(columnsSQL)
        
        # Populate fields list
        while True:
            field = cur.fetchone()
            if field is None:
                break
            fieldList.append(field[0])
        
    except Exception, e:
        print('Could not get column names from {0}'.format(table))
        print(e)
    
    try:
        # Get gid values
        gidSQL = 'SELECT DISTINCT ON(gid) gid FROM ' + schema + '.' + table + ';'
        cur.execute(gidSQL)
        
        #Populate gid list
        while True:
            gidValue = cur.fetchone()
            if gidValue is None:
                break
            gidList.append(gidValue[0])
        
    except Exception, e:
        print('Could not get gid values from {0}'.format(table))
        print(e)
    
    # Get each row and create key-value pair in data object
    for gidValue in gidList:
        row = {}
        for field in fieldList:
            selectSQL = 'SELECT ' + field + ' FROM ' + schema + '.' + table + ' WHERE gid = ' + str(gidValue) + ';'
            cur.execute(selectSQL)
            value = cur.fetchone()[0]
            row[field] = value
        jsonArray.append(row)
         
                
   
with open(outputJSON, 'w') as outfile:
    json.dump(jsonObject, outfile, indent = 4)
    
    

