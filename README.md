# Project PlayRate

Aplikacija za praćenje odigranih video igara i njihovo ocenjivanje.


## :video_camera: Demo video 
* [PlayRate](https://youtu.be/edCNb9MWaM0)


# Pokretanje projekta iz izvornog koda:
Da bi se klijent i server pokrenuli, potrebno je prvo na sistemu instalirati [Node](https://nodejs.org/en/download/), [MongoDB](https://www.mongodb.com/try/download/community) i [Mongo Shell](https://www.mongodb.com/try/download/shell) <br>
Za importovanje podataka u bazu, potrebno je instalirati i dodatne [Mongo alate](https://www.mongodb.com/try/download/database-tools) od kojih je potreban alat `mongoimport`<br>

Da bi se projekat skinuo, na sistemu je potrebno instalirati i [git](https://git-scm.com/downloads) <br>
Izvorni kod projekta preuzeti komandom: `git clone https://gitlab.com/matfpveb/projekti/2022-2023/02-PlayRate.git` <br>
i komandom `cd 02-PlayRate/` uci u direktorijum projekta

# Podešavanje baze podataka:
Pozicionirati se u folder `data` i pokrenuti komande: <br>
`mongoimport --db playrate --collection users --file users.json --jsonArray` <br>
`mongoimport --db playrate --collection posts --file posts.json --jsonArray` <br>
`mongoimport --db playrate --collection games --file games.json --jsonArray`  <br>

**Sheme:** <br>
User - Sadrži podatke o korisnicima <br>
Post - Sadrži podatke o korisničkim postovima <br>
Game - Sadrži podatke o igrama <br>

# Pokretanje servera:
Pozicionirati se u folder `server` i u komandoj liniji pokrenuti komandu `npm install` <br>
Ovo ce instalirati sve neophodne biblioteke.
Pokrenuti server komandom `node server.js`

# Pokretanje klijenta:
Slicno kao i za pokretnaje servera. <br>
Pozicionirati se u folder `client`, i instalirati sve potrebne biblioteke komandom `npm install`<br>
Nakon toga pokrenuti klijent komandom `ng serve` <br>
Aplikaciji se pristupa kroz web browser putem adrese http://localhost:4200




## Developers

- [Minja Popović, 039/2018](https://gitlab.com/Prophethor)
- [Stefanija Markovic, 306/2018](https://gitlab.com/stefanijam)
- [Pavle Vlajkovic, 298/2017](https://gitlab.com/PavleVL)
- [Marija Škorić, 063/2018](https://gitlab.com/0MarijaS)
- [Tihomir Stojković, 283/2018](https://gitlab.com/Tihomir-99)
