from urllib.request import urlopen

url = "https://www.pwnrank.com/top-500"
page = urlopen(url)

html_bytes = page.read()
html = html_bytes.decode("utf-8")

f = open("./videoGameData/parsedVideoGameList.txt", "w")
f.write(html)
f.close()
