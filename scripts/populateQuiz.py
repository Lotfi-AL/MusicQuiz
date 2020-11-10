import json
import requests
import random

genres =["RnB","Rap","Rock"]
titles =["Best ever","Top 10","Top twenty"]
song_ids = []


def signUp():
    url = "http://localhost:1337/api/signUp"
    user ={
        "username":"lofi",
        "password":"lofi"
    }
    
    requests.post(url,json=user)


def signIn():
    url = "http://localhost:1337/api/signIn"
    user = {
    "username":"lofi",
    "password":"lofi"
    }
    response = requests.post(url,json=user)
    res_json = response.json()
    token = res_json["token"]
    author = res_json["id"]
    return token,author

def getSongIds():
    url="http://localhost:1337/api/song"
    res =requests.get(url)
    for item in res.json():
        song_ids.append(item["_id"])
    

def addQuiz(token,author):
    url = 'http://localhost:1337/api/quiz'
    auth = "Bearer "+token
    headers = {"authorization":auth}
    with open("quizzes2.json","a") as f:
        for i in range(100):
            title = random.choice(titles)
            genre = random.choice(genres)
            songs = random.choices(song_ids,k=random.randrange(1,10))
            quiz = {"title":title,"genre":genre,"creator":author,"songs":songs}
            print(quiz)
            print(headers)
            print(requests.post(url,json=quiz,headers=headers))
            
def main():
    signUp()
    token,author = signIn()
    addQuiz(token,author)
    
main()
