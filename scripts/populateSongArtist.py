import csv
import requests


def addArtist():
    url = 'http://localhost:1337/api/artist'
    with open('top10s.csv') as csv_file:
        csv_reader = csv.reader(csv_file, delimiter=',')
        artists = []
        line_count = 0
        for row in csv_reader:
            if line_count == 0:
                print(f'Column names are {", ".join(row)}')
                line_count += 1
            else:
                if( (str(row[2]) not in artists)):
                    artists.append(str(row[2]))
                    data = {
                        'name': str(row[2])                
                    }
                    requests.post(url, json=data)
                line_count += 1
        print(artists)
        print(f'Processed {line_count} lines.')
        
def addSong():
    url = 'http://localhost:1337/api/song'
    with open('top10s.csv') as csv_file:
        csv_reader = csv.reader(csv_file, delimiter=',')
        line_count = 0
        for row in csv_reader:
            if line_count == 0:
                print(f'Column names are {", ".join(row)}')
                line_count += 1
            else:
                data = {
                    'title': str(row[1]),
                    'bpm': str(row[6]),
                    'artist': str(row[2]),
                    'genre': str(row[3]),
                    'duration': str(row[11])
                    
                }
                requests.post(url, json=data)
                print(data)
                line_count += 1

addArtist()
addSong()