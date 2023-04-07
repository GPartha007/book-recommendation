import requests

url = "https://google-search72.p.rapidapi.com/search"

querystring = {"query":"word cup","gl":"us","lr":"en","num":"10","start":"0","sort":"relevance"}

headers = {
	"X-RapidAPI-Key": "SIGN-UP-FOR-KEY",
	"X-RapidAPI-Host": "google-search72.p.rapidapi.com"
}

response = requests.request("GET", url, headers=headers, params=querystring)

print(response.text)