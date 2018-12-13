import pandas as pd
import MySQLdb
from datetime import datetime as dt
from datetime import timedelta
from DBCreationUtil import *


DATE = dt.now()
NUM_OF_WEEKS = 52
WEEKS = constructWeeks(DATE, NUM_OF_WEEKS)
HOST = "localhost"
USERNAME = "root"
PASSWORD = "root"
DATABASE = "artists"
df = Construct_History(WEEKS)
#Write into Connection
conn = MySQLdb.connect(HOST,USERNAME,PASSWORD,DATABASE)
df = pd.read_csv('Data/BillBoardHistory.csv',sep = ',',index_col = 0)
cursor = conn.cursor()
stm = "DROP TABLE IF EXISTS history"
cursor.execute(stm)
stm = "CREATE TABLE history ("\
       + "id INT NOT NULL,"\
       + "name VARCHAR(255) NOT NULL,"\
       + "rank INT,"\
       + "song VARCHAR(255),"\
       + "week VARCHAR (255),"\
       + "PRIMARY KEY (id)"\
       + ")"

cursor.execute(stm)
for index,row in df.iterrows():
    id = index
    name = row['Artists']
    rank = row['Rank']
    song = row['Song']
    week = row['Week']
    stm = "INSERT INTO history VALUES (\"" + str(id) + "\",\""\
        + str(name) + "\",\"" + str(rank) + "\",\""+ str(song) + "\",\""\
        + str(week) + "\");"
    cursor.execute(stm)

try:
    conn.commit()
except:
    conn.rollback()
conn.close()