import pandas as pd
import numpy as np
import requests,re,time,os,datetime,argparse
from bs4 import BeautifulSoup
from datetime import datetime ,timedelta

def getLastSaturday(date):
    if ((date.weekday() + 1) % 7 ) == 6:
        return date
    idx = (date.weekday() + 1) % 7
    return date - timedelta(7+idx - 6)

def constructWeeks(date, numOfWeeks):
    WEEKS = []
    date = getLastSaturday(date)
    for i in range(numOfWeeks):
        period = date - i * timedelta(days = 7)
        WEEKS.append(getString(period))
    
    return WEEKS

def BillBoardWeb(date):
    return 'https://www.billboard.com/charts/hot-100/' + date

def clean(name):
    name = re.sub('\n','',name).lstrip().rstrip()
    return name

def getWinner(string):
    name_song = string.split('-')
    return name_song[0].lstrip().rstrip(), name_song[1].lstrip().rstrip()

def getString(dt):
    year  = str(dt.year)
    if dt.month >= 10:
        month = str(dt.month)
    else:
        month = '0' + str(dt.month)
    if dt.day >= 10:
        day = str(dt.day)
    else:
        day = '0' + str(dt.day)
    
    return year+'-'+month+'-'+day

def Construct_History(WEEKS):
    filename = 'Data/BillBoardHistory.csv'
    df = pd.DataFrame(columns = ['Artists','Song', 'Rank','Week'])
    for i,week in enumerate(WEEKS):
        print('Dealing With Week on' ,week)
        artists = []
        songs =  []
        webpage = BillBoardWeb(week)
        page = requests.get(webpage)
        soup = BeautifulSoup(page.text,'html.parser')
        winner_soup = soup.select('.chart-video__wrapper')[0]['data-title']
    
        win_artist, win_song = getWinner(winner_soup)

        songs_soup = soup.select('.chart-details .chart-list-item .chart-list-item__title-text')
        artists_soup = soup.select('.chart-details .chart-list-item .chart-list-item__artist')
        for j,artist_soup in enumerate(artists_soup):
            artist = clean(artist_soup.text)
            artists.append(artist)
        for song in songs_soup:
            songs.append(clean(song.text))
        artists = [win_artist] + artists
        songs = [win_song] + songs
        df_artists_songs = pd.DataFrame({'Artists':artists, 'Song':songs, 'Rank': [rank + 1 for rank in range(len(artists))], 'Week': [week for _ in range(len(artists))]})
        df = pd.concat([df,df_artists_songs])

    if ('Data' not in os.listdir()):
        os.mkdir('Data')
    df.reset_index(inplace = True, drop = True)
    print(df)
    df.to_csv('Data/BillBoardHistory.csv',sep = ',')
    return df

