from urllib.request import urlopen

title = []
genre = []
yearMade = []
coverImg = []

f = open("parsedVideoGameList.txt", "r")
Lines = f.readlines()
for line in Lines:
    line = line.strip()

    # parse the title and yearMade
    if len(line) > 20 and line[0:19] == "<div class=\"title\">":
        line = line[21:]
        if line[0] == ".":
            line = line[2:]
        elif line[1] == ".":
            line = line[3:]
        else:
            line = line[1:]
        line = line.split("(")
        title.append(line[0])
        yearMade.append(line[1][0:3])

    # parse the genre, the link is link to wikipedia
    if len(line) > 20 and line[0:9] == "Platforms":
        genre.append(line.split("|")[1][8:-1])
        
    # parse the image
    if len(line) > 20 and line[0:18] == "<div class=\"image\"":
        coverImg.append(line.split("url(")[1][0:-10])
f.close()

print("title length: " , len(title))
print("genre length: ", len(genre))
print("yearMade length: ", len(yearMade))
print("coverImg length: ", len(coverImg))
print()


Output = []
for i in range(496):
    temp = []
    temp.append(title[i])
    temp.append(genre[i])
    temp.append(yearMade[i])

    # Fill in missing cover from wikipedia
    # 267 Doom Eternal 
    # 348 Dead Cells 
    # 378 Gloria Victis 
    # 391 X-COM 2: War of the Chosen 
    # 421 Halo: The Master Chief Collection 
    # 428 Fire Emblem: Three Houses 
    if coverImg[i] == "":
        if i == 267:
            temp.append("https://en.wikipedia.org/wiki/Doom_Eternal#/media/File:Cover_Art_of_Doom_Eternal.png")
        if i == 348:
            temp.append("https://en.wikipedia.org/wiki/Dead_Cells#/media/File:Dead_cells_cover_art.png")
        if i == 378:
            temp.append("https://cdn.cloudflare.steamstatic.com/steam/apps/327070/header.jpg?t=1693575040")
        if i == 391:
            temp.append("https://cdn.cloudflare.steamstatic.com/steam/apps/327070/header.jpg?t=1693575040")
        if i == 421:
            temp.append("https://en.wikipedia.org/wiki/Halo:_The_Master_Chief_Collection#/media/File:Halo_TMCC_KeyArt_Vert_2019.png")
        if i == 428:
            temp.append("https://en.wikipedia.org/wiki/Fire_Emblem:_Three_Houses#/media/File:Fire_Emblem_Three_Houses.jpg")
    else:
        temp.append(coverImg[i])
    # Test code to make sure all the image is covered        
    # if temp[3] == "":
    #     print(temp)
    Output.append(temp)

f = open("SQLQuery.txt", "a")
for index, o in enumerate(Output):
    f.write( "(" + str(index) + ", \"" + title[index] + "\", " + genre[index] + "\", " + str(yearMade[index]) + ", \"" + coverImg[i] + "\"),\n")
f.close()
