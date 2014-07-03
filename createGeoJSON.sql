-------------------------------------------------
---- filename: createGeoJSON.sql
---- Created By: Jon Duckworth
---- Created On: 5-26-2014
---- Updated On:
----
---- Description: Creates GeoJSON files for elementary, middle, 
----  and high schools with all information required for HTML
----  pop-up. Also creates GeoJSON file for districts with same
----  information.
-------------------------------------------------

--------------Elementary Schools-----------------

---- CREATE SCHEMA geom_outputs;

DROP TABLE IF EXISTS geom_outputs.allgradesJSON;

---- Summarize demographic information for each school's
----  elementary grade levels.

SELECT demog.schoolinfo_id, demog.school, demog.poc_tot, demog.white_tot, demog.total_students, demog.freeandreduced_num, demog.noteligible_num, sp.geom_wgs84
INTO geom_outputs.allgradesJSON
FROM school_points AS sp
INNER JOIN 
(SELECT si.schoolinfo_id, si.school, gi.poc_tot, gi.white_tot, gi.total_students, si.freeandreduced_num, si.noteligible_num
FROM
(SELECT schoolinfo_id, sum(am_ind_f) + sum(am_ind_m) + sum(asian_f) + sum(asian_m) + sum(af_am_f) + sum(af_am_m) +
	sum(hispanic_f) + sum(hispanic_m) + sum(two_or_more_m) + sum(pac_isl_f) + sum(pac_isl_m) + sum(two_or_more_f) AS poc_tot, 
	sum(white_f) + sum(white_m) AS white_tot, sum(total_students) AS total_students
FROM year2013.grade_info
WHERE (gradelevel != 'P' AND (gradelevel = 'K' OR CAST(gradelevel AS integer) <= 5))
GROUP BY schoolinfo_id) AS gi
INNER JOIN year2013.school_info AS si
ON gi.schoolinfo_id = si.schoolinfo_id) AS demog
ON sp.schoolinfo_id = demog.schoolinfo_id ;

ALTER TABLE geom_outputs.allgradesJSON
ADD PRIMARY KEY (schoolinfo_id);

---- Add columns for total EE hrs. at each grade level for each school

ALTER TABLE geom_outputs.allgradesJSON
ADD COLUMN eehrs_p float;
ALTER TABLE geom_outputs.allgradesJSON
ADD COLUMN eehrs_k float;
ALTER TABLE geom_outputs.allgradesJSON
ADD COLUMN eehrs_1 float;
ALTER TABLE geom_outputs.allgradesJSON
ADD COLUMN eehrs_2 float;
ALTER TABLE geom_outputs.allgradesJSON
ADD COLUMN eehrs_3 float;
ALTER TABLE geom_outputs.allgradesJSON
ADD COLUMN eehrs_4 float;
ALTER TABLE geom_outputs.allgradesJSON
ADD COLUMN eehrs_5 float;
ALTER TABLE geom_outputs.allgradesJSON
ADD COLUMN eehrs_6 float;
ALTER TABLE geom_outputs.allgradesJSON
ADD COLUMN eehrs_7 float;
ALTER TABLE geom_outputs.allgradesJSON
ADD COLUMN eehrs_8 float;
ALTER TABLE geom_outputs.allgradesJSON
ADD COLUMN eehrs_9 float;
ALTER TABLE geom_outputs.allgradesJSON
ADD COLUMN eehrs_10 float;
ALTER TABLE geom_outputs.allgradesJSON
ADD COLUMN eehrs_11 float;
ALTER TABLE geom_outputs.allgradesJSON
ADD COLUMN eehrs_12 float;

---- Add columns for number of students at each grade level at each school
ALTER TABLE geom_outputs.allgradesJSON
ADD COLUMN students_p int;
ALTER TABLE geom_outputs.allgradesJSON
ADD COLUMN students_k int;
ALTER TABLE geom_outputs.allgradesJSON
ADD COLUMN students_1 int;
ALTER TABLE geom_outputs.allgradesJSON
ADD COLUMN students_2 int;
ALTER TABLE geom_outputs.allgradesJSON
ADD COLUMN students_3 int;
ALTER TABLE geom_outputs.allgradesJSON
ADD COLUMN students_4 int;
ALTER TABLE geom_outputs.allgradesJSON
ADD COLUMN students_5 int;
ALTER TABLE geom_outputs.allgradesJSON
ADD COLUMN students_6 int;
ALTER TABLE geom_outputs.allgradesJSON
ADD COLUMN students_7 int;
ALTER TABLE geom_outputs.allgradesJSON
ADD COLUMN students_8 int;
ALTER TABLE geom_outputs.allgradesJSON
ADD COLUMN students_9 int;
ALTER TABLE geom_outputs.allgradesJSON
ADD COLUMN students_10 int;
ALTER TABLE geom_outputs.allgradesJSON
ADD COLUMN students_11 int;
ALTER TABLE geom_outputs.allgradesJSON
ADD COLUMN students_12 int;


---- Calculate total EE hrs. for a given grade

UPDATE geom_outputs.allgradesJSON as json
SET eehrs_p = ROUND(eehrs.total_hrs::numeric, 1)
FROM
(SELECT schoolinfo_id, gradelevel, total_hrs
FROM
(SELECT gradeinfo_id, sum(first_hrs) AS total_hrs
FROM (SELECT DISTINCT ON (eeprograms_id, first_date, gradeinfo_id) * FROM year2013.ee_programsdelivered) AS x
GROUP BY gradeinfo_id) AS eegrade
LEFT JOIN year2013.grade_info gi
ON eegrade.gradeinfo_id = gi.gradeinfo_id) AS eehrs
WHERE (json.schoolinfo_id = eehrs.schoolinfo_id AND eehrs.gradelevel = 'P');

UPDATE geom_outputs.allgradesJSON as json
SET eehrs_k = ROUND(eehrs.total_hrs::numeric, 1)
FROM
(SELECT schoolinfo_id, gradelevel, total_hrs
FROM
(SELECT gradeinfo_id, sum(first_hrs) AS total_hrs
FROM (SELECT DISTINCT ON (eeprograms_id, first_date, gradeinfo_id) * FROM year2013.ee_programsdelivered) AS x
GROUP BY gradeinfo_id) AS eegrade
LEFT JOIN year2013.grade_info gi
ON eegrade.gradeinfo_id = gi.gradeinfo_id) AS eehrs
WHERE (json.schoolinfo_id = eehrs.schoolinfo_id AND eehrs.gradelevel = 'K');

UPDATE geom_outputs.allgradesJSON as json
SET eehrs_1 = ROUND(eehrs.total_hrs::numeric, 1)
FROM
(SELECT schoolinfo_id, gradelevel, total_hrs
FROM
(SELECT gradeinfo_id, sum(first_hrs) AS total_hrs
FROM (SELECT DISTINCT ON (eeprograms_id, first_date, gradeinfo_id) * FROM year2013.ee_programsdelivered) AS x
GROUP BY gradeinfo_id) AS eegrade
LEFT JOIN year2013.grade_info gi
ON eegrade.gradeinfo_id = gi.gradeinfo_id) AS eehrs
WHERE (json.schoolinfo_id = eehrs.schoolinfo_id AND eehrs.gradelevel = '1');

UPDATE geom_outputs.allgradesJSON as json
SET eehrs_2 = ROUND(eehrs.total_hrs::numeric, 1)
FROM
(SELECT schoolinfo_id, gradelevel, total_hrs
FROM
(SELECT gradeinfo_id, sum(first_hrs) AS total_hrs
FROM (SELECT DISTINCT ON (eeprograms_id, first_date, gradeinfo_id) * FROM year2013.ee_programsdelivered) AS x
GROUP BY gradeinfo_id) AS eegrade
LEFT JOIN year2013.grade_info gi
ON eegrade.gradeinfo_id = gi.gradeinfo_id) AS eehrs
WHERE (json.schoolinfo_id = eehrs.schoolinfo_id AND eehrs.gradelevel = '2');

UPDATE geom_outputs.allgradesJSON as json
SET eehrs_3 = ROUND(eehrs.total_hrs::numeric, 1)
FROM
(SELECT schoolinfo_id, gradelevel, total_hrs
FROM
(SELECT gradeinfo_id, sum(first_hrs) AS total_hrs
FROM (SELECT DISTINCT ON (eeprograms_id, first_date, gradeinfo_id) * FROM year2013.ee_programsdelivered) AS x
GROUP BY gradeinfo_id) AS eegrade
LEFT JOIN year2013.grade_info gi
ON eegrade.gradeinfo_id = gi.gradeinfo_id) AS eehrs
WHERE (json.schoolinfo_id = eehrs.schoolinfo_id AND eehrs.gradelevel = '3');

UPDATE geom_outputs.allgradesJSON as json
SET eehrs_4 = ROUND(eehrs.total_hrs::numeric, 1)
FROM
(SELECT schoolinfo_id, gradelevel, total_hrs
FROM
(SELECT gradeinfo_id, sum(first_hrs) AS total_hrs
FROM (SELECT DISTINCT ON (eeprograms_id, first_date, gradeinfo_id) * FROM year2013.ee_programsdelivered) AS x
GROUP BY gradeinfo_id) AS eegrade
LEFT JOIN year2013.grade_info gi
ON eegrade.gradeinfo_id = gi.gradeinfo_id) AS eehrs
WHERE (json.schoolinfo_id = eehrs.schoolinfo_id AND eehrs.gradelevel = '4');

UPDATE geom_outputs.allgradesJSON as json
SET eehrs_5 = ROUND(eehrs.total_hrs::numeric, 1)
FROM
(SELECT schoolinfo_id, gradelevel, total_hrs
FROM
(SELECT gradeinfo_id, sum(first_hrs) AS total_hrs
FROM (SELECT DISTINCT ON (eeprograms_id, first_date, gradeinfo_id) * FROM year2013.ee_programsdelivered) AS x
GROUP BY gradeinfo_id) AS eegrade
LEFT JOIN year2013.grade_info gi
ON eegrade.gradeinfo_id = gi.gradeinfo_id) AS eehrs
WHERE (json.schoolinfo_id = eehrs.schoolinfo_id AND eehrs.gradelevel = '5');

UPDATE geom_outputs.allgradesJSON as json
SET eehrs_6 = ROUND(eehrs.total_hrs::numeric, 1)
FROM
(SELECT schoolinfo_id, gradelevel, total_hrs
FROM
(SELECT gradeinfo_id, sum(first_hrs) AS total_hrs
FROM (SELECT DISTINCT ON (eeprograms_id, first_date, gradeinfo_id) * FROM year2013.ee_programsdelivered) AS x
GROUP BY gradeinfo_id) AS eegrade
LEFT JOIN year2013.grade_info gi
ON eegrade.gradeinfo_id = gi.gradeinfo_id) AS eehrs
WHERE (json.schoolinfo_id = eehrs.schoolinfo_id AND eehrs.gradelevel = '6');

UPDATE geom_outputs.allgradesJSON as json
SET eehrs_7 = ROUND(eehrs.total_hrs::numeric, 1)
FROM
(SELECT schoolinfo_id, gradelevel, total_hrs
FROM
(SELECT gradeinfo_id, sum(first_hrs) AS total_hrs
FROM (SELECT DISTINCT ON (eeprograms_id, first_date, gradeinfo_id) * FROM year2013.ee_programsdelivered) AS x
GROUP BY gradeinfo_id) AS eegrade
LEFT JOIN year2013.grade_info gi
ON eegrade.gradeinfo_id = gi.gradeinfo_id) AS eehrs
WHERE (json.schoolinfo_id = eehrs.schoolinfo_id AND eehrs.gradelevel = '7');

UPDATE geom_outputs.allgradesJSON as json
SET eehrs_8 = ROUND(eehrs.total_hrs::numeric, 1)
FROM
(SELECT schoolinfo_id, gradelevel, total_hrs
FROM
(SELECT gradeinfo_id, sum(first_hrs) AS total_hrs
FROM (SELECT DISTINCT ON (eeprograms_id, first_date, gradeinfo_id) * FROM year2013.ee_programsdelivered) AS x
GROUP BY gradeinfo_id) AS eegrade
LEFT JOIN year2013.grade_info gi
ON eegrade.gradeinfo_id = gi.gradeinfo_id) AS eehrs
WHERE (json.schoolinfo_id = eehrs.schoolinfo_id AND eehrs.gradelevel = '8');

UPDATE geom_outputs.allgradesJSON as json
SET eehrs_9 = ROUND(eehrs.total_hrs::numeric, 1)
FROM
(SELECT schoolinfo_id, gradelevel, total_hrs
FROM
(SELECT gradeinfo_id, sum(first_hrs) AS total_hrs
FROM (SELECT DISTINCT ON (eeprograms_id, first_date, gradeinfo_id) * FROM year2013.ee_programsdelivered) AS x
GROUP BY gradeinfo_id) AS eegrade
LEFT JOIN year2013.grade_info gi
ON eegrade.gradeinfo_id = gi.gradeinfo_id) AS eehrs
WHERE (json.schoolinfo_id = eehrs.schoolinfo_id AND eehrs.gradelevel = '9');

UPDATE geom_outputs.allgradesJSON as json
SET eehrs_10 = ROUND(eehrs.total_hrs::numeric, 1)
FROM
(SELECT schoolinfo_id, gradelevel, total_hrs
FROM
(SELECT gradeinfo_id, sum(first_hrs) AS total_hrs
FROM (SELECT DISTINCT ON (eeprograms_id, first_date, gradeinfo_id) * FROM year2013.ee_programsdelivered) AS x
GROUP BY gradeinfo_id) AS eegrade
LEFT JOIN year2013.grade_info gi
ON eegrade.gradeinfo_id = gi.gradeinfo_id) AS eehrs
WHERE (json.schoolinfo_id = eehrs.schoolinfo_id AND eehrs.gradelevel = '10');

UPDATE geom_outputs.allgradesJSON as json
SET eehrs_11 = ROUND(eehrs.total_hrs::numeric, 1)
FROM
(SELECT schoolinfo_id, gradelevel, total_hrs
FROM
(SELECT gradeinfo_id, sum(first_hrs) AS total_hrs
FROM (SELECT DISTINCT ON (eeprograms_id, first_date, gradeinfo_id) * FROM year2013.ee_programsdelivered) AS x
GROUP BY gradeinfo_id) AS eegrade
LEFT JOIN year2013.grade_info gi
ON eegrade.gradeinfo_id = gi.gradeinfo_id) AS eehrs
WHERE (json.schoolinfo_id = eehrs.schoolinfo_id AND eehrs.gradelevel = '11');

UPDATE geom_outputs.allgradesJSON as json
SET eehrs_12 = ROUND(eehrs.total_hrs::numeric, 1)
FROM
(SELECT schoolinfo_id, gradelevel, total_hrs
FROM
(SELECT gradeinfo_id, sum(first_hrs) AS total_hrs
FROM (SELECT DISTINCT ON (eeprograms_id, first_date, gradeinfo_id) * FROM year2013.ee_programsdelivered) AS x
GROUP BY gradeinfo_id) AS eegrade
LEFT JOIN year2013.grade_info gi
ON eegrade.gradeinfo_id = gi.gradeinfo_id) AS eehrs
WHERE (json.schoolinfo_id = eehrs.schoolinfo_id AND eehrs.gradelevel = '12');

---- Update number of students for each grade level/school
---- NOT DEBUGGED YET

UPDATE geom_outputs.allgradesJSON as json
SET students_p = gi.total_students
FROM year2013.grade_info AS gi 
WHERE (gi.schoolinfo_id = json.schoolinfo_id AND gi.gradelevel = 'P');

UPDATE geom_outputs.allgradesJSON as json
SET students_p = gi.total_students
FROM year2013.grade_info AS gi 
WHERE (gi.schoolinfo_id = json.schoolinfo_id AND gi.gradelevel = 'K');

UPDATE geom_outputs.allgradesJSON as json
SET students_p = gi.total_students
FROM year2013.grade_info AS gi 
WHERE (gi.schoolinfo_id = json.schoolinfo_id AND gi.gradelevel = '1');

UPDATE geom_outputs.allgradesJSON as json
SET students_p = gi.total_students
FROM year2013.grade_info AS gi 
WHERE (gi.schoolinfo_id = json.schoolinfo_id AND gi.gradelevel = '2');

UPDATE geom_outputs.allgradesJSON as json
SET students_p = gi.total_students
FROM year2013.grade_info AS gi 
WHERE (gi.schoolinfo_id = json.schoolinfo_id AND gi.gradelevel = '3');

UPDATE geom_outputs.allgradesJSON as json
SET students_p = gi.total_students
FROM year2013.grade_info AS gi 
WHERE (gi.schoolinfo_id = json.schoolinfo_id AND gi.gradelevel = '4');

UPDATE geom_outputs.allgradesJSON as json
SET students_p = gi.total_students
FROM year2013.grade_info AS gi 
WHERE (gi.schoolinfo_id = json.schoolinfo_id AND gi.gradelevel = '5');

UPDATE geom_outputs.allgradesJSON as json
SET students_p = gi.total_students
FROM year2013.grade_info AS gi 
WHERE (gi.schoolinfo_id = json.schoolinfo_id AND gi.gradelevel = '6');

UPDATE geom_outputs.allgradesJSON as json
SET students_p = gi.total_students
FROM year2013.grade_info AS gi 
WHERE (gi.schoolinfo_id = json.schoolinfo_id AND gi.gradelevel = '7');

UPDATE geom_outputs.allgradesJSON as json
SET students_p = gi.total_students
FROM year2013.grade_info AS gi 
WHERE (gi.schoolinfo_id = json.schoolinfo_id AND gi.gradelevel = '8');

UPDATE geom_outputs.allgradesJSON as json
SET students_p = gi.total_students
FROM year2013.grade_info AS gi 
WHERE (gi.schoolinfo_id = json.schoolinfo_id AND gi.gradelevel = '9');

UPDATE geom_outputs.allgradesJSON as json
SET students_p = gi.total_students
FROM year2013.grade_info AS gi 
WHERE (gi.schoolinfo_id = json.schoolinfo_id AND gi.gradelevel = '10');

UPDATE geom_outputs.allgradesJSON as json
SET students_p = gi.total_students
FROM year2013.grade_info AS gi 
WHERE (gi.schoolinfo_id = json.schoolinfo_id AND gi.gradelevel = '11');

UPDATE geom_outputs.allgradesJSON as json
SET students_p = gi.total_students
FROM year2013.grade_info AS gi 
WHERE (gi.schoolinfo_id = json.schoolinfo_id AND gi.gradelevel = '12');

---- Reset all eehrs values to null for grades that do not exist (e.g. 9th grade at an elem. school)
---- NOT DEBUGGED YET
UPDATE geom_outputs.allgradesJSON
SET eehrs_p = DEFAULT 
WHERE students_p = 0;

UPDATE geom_outputs.allgradesJSON
SET eehrs_k = DEFAULT 
WHERE students_k = 0;

UPDATE geom_outputs.allgradesJSON
SET eehrs_1 = DEFAULT 
WHERE students_1 = 0;

UPDATE geom_outputs.allgradesJSON
SET eehrs_2 = DEFAULT 
WHERE students_2 = 0;

UPDATE geom_outputs.allgradesJSON
SET eehrs_3 = DEFAULT 
WHERE students_3 = 0;

UPDATE geom_outputs.allgradesJSON
SET eehrs_4 = DEFAULT 
WHERE students_4 = 0;

UPDATE geom_outputs.allgradesJSON
SET eehrs_5 = DEFAULT 
WHERE students_5 = 0;

UPDATE geom_outputs.allgradesJSON
SET eehrs_6 = DEFAULT 
WHERE students_6 = 0;

UPDATE geom_outputs.allgradesJSON
SET eehrs_7 = DEFAULT 
WHERE students_7 = 0;

UPDATE geom_outputs.allgradesJSON
SET eehrs_8 = DEFAULT 
WHERE students_8 = 0;

UPDATE geom_outputs.allgradesJSON
SET eehrs_9 = DEFAULT 
WHERE students_9 = 0;

UPDATE geom_outputs.allgradesJSON
SET eehrs_10 = DEFAULT 
WHERE students_10 = 0;

UPDATE geom_outputs.allgradesJSON
SET eehrs_11 = DEFAULT 
WHERE students_11 = 0;

UPDATE geom_outputs.allgradesJSON
SET eehrs_12 = DEFAULT 
WHERE students_12 = 0;
