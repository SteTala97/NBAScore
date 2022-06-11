<h1>Visualizzazione In Live</h1>

<h2>Frontend</h2>

La visualizzazione delle informazioni relative alle partite in data odierna viene implementata con l'utilizzo delle seguenti componenti classe:

1. Live
2. Match
3. Team

Vi sono alcune componenti funzione aggiuntive per eseguire alcuni controlli durante l'esecuzione:
1. CheckEmpty
2. TableGames
3. Progress

<h3>Componente Live</h3>

_Live_ è la componente di root ed è inserita nella componente App. Qui avviene la richiesta di GET al server per ottenere i dati da visualizzare. Al fine di effettuare questa richiesta, appena la componente viene creata/mounted, viene chiamata la funzione di fetch(), la quale effettua la call al server. L'unico parametro richiesto è il giorno e in questo caso basta prendere quello in data odierna, che passerà al server durante la GET. La funzione fetch(), oltre ad essere chiamata durante la creazione, viene anche richiamata ogni 120 secondi poichè si devono avere le informazioni delle partite in live aggiornate.

Tale componente ha come scopo quello di creare la tabella delle partite e lo fa effettuando prima un controllo con la funzione componente _CheckEmpty_; la quale verifica se la chiamata ha restituito delle partite oppure no, in tal caso viene restituito il componente Alert che avvisa la mancanza di partite. Altrimenti, se vi sono partite in giornata, allora viene chiamata la funzione componente TableGames, la quale provvede a creare la tabella e per ogni riga/partita viene creato il componente Match.
</details>

<h3>Componente Match</h3>

Renderizza in formato riga/TableRow le informazioni generali relative alla partita identificata dall'id; queste informazioni sono:

- Tipo della partita (Finished, In Play, Scheduled)
- Logo squadra "home";
- Logo squadra "visitors;
- Nome squadra "home";
- Nome squadra "visitors";
- Punteggio squadra "home";
- Punteggio squadra "visitors";
- Tempo di gioco;
- LineScore squadra "home";
- LineScore squadra "visitors";

Nel caso in cui alcune di queste informazioni manchino, ad esempio se una partita non è stata ancora giocata, nelle colonne relative si avranno dei vuoti senza creare alcuna problematica. Tutti i dati visualizzati vengono ottenuti in input dalla componente padre sotto forma di _prop_.

Se si ha che una partita risulta essere "In Play", allora la funzione componente Progress creerà una barra di caricamento sotto alla descrizione della tipologia.

Alla fine della riga si ha per ogni partita il pulsante che, se premuto, rimanda l'utente al componente "Visualizzazione Informazioni Partita", in modo da avere una panoramica più dettagliata di quella specifica partita.

Ad ogni riga si ha la visualizzazione dei nomi delle squadre, dove per ogni nome si è associato il componente Team.

<h3>Componente Team</h3>

Renderizza il nome di ogni squadra; la visualizzazione è gestita tramite TabelCell della TableRow creata dal componente Match. 

<h2>Backend</h2>

Il lato server per la visualizzazione delle informazioni relative alle partite della giornata è implementato tramite un singolo endpoint che si connette ad un'[API esterna](https://rapidapi.com/api-sports/api/api-nba) da cui vengono ottenuti tutti i dati da visualizzare.

Tale endpoint è nominato gamesToday

Restituisce come risposta i dati da visualizzare sottoforma di array delle partite alla rispettiva componente, riportando come codice di stato il valore **200**. Qualora si verificasse un errore invece, la risposta riporterà tale errore sotto forma di messaggio e lo stato della risposta sarà **400**.

<hr/><hr/>

<h1>Visualizzazione Classifiche</h1>

<h2>Frontend</h2>

La visualizzazione delle classifiche è articolata in 3 componenti funzione:

1. StandingView
2. StandingsNavBar
3. StandingTable

L’**obiettivo** è quello di visualizzare la classifica per una determinata conference e stagione.

<h3>Componente StandingView</h3>

_StandingView_ è la componente ‘padre’ che renderizza le altre 2 e fornisce loro le variabili di stato e le funzioni di cui hanno bisogno per funzionare correttamente.

Oltretutto, _StandingView_ è anche responsabile del passaggio alla visualizzazione delle informazioni di una squadra di interesse quando richiesto e, per tale motivo, riceve in input tramite _props_ sia i dati che le funzioni necessari per gestire tale visualizzazione.

<h3>Componente StandingsNavBar</h3>

La componente _StandingsNavBar_ implementa la sezione di pagina che permette all'utente di impostare ed effettuare la ricerca della classifica per una certa stagione e per una certa conference.

Più precisamente, tale componente è composta da:
- un drop-down menu per selezionare la stagione;
- un drop-down menu per selezionare la conference;
- un pulsante per avviare la ricerca.

Al caricamento di questa componente avviene la chiamata GET al server per ottenere l’elenco delle stagioni disponibili, che verranno visualizzate nell'apposito drop-down menu.

Inoltre, quando si clicca sul pulsante della ricerca, avviene la chiamata GET al server per ricavare i dati della classifica nella stagione e nella conference selezionate nei drop-down menu, i quali verranno poi visualizzati nella componente _StandingTable_.

Tuttavia, se la chiamata al server per ottenere l'elenco delle stagioni dovesse fallire oppure se si tentasse di effettuare una ricerca senza aver prima selezionato la stagione e la conference di interesse, allora la componente _StandingsNavBar_ provvederà a visualizzare un apposito messaggio informativo per l’utente.

**Nota**: le _conference_ sono standard (_East_ e _West_) e quindi vengono settate direttamente nel corrispondente drop-down menu senza alcuna interazione col server.

**Nota**: nel caso fallisca la chiamata al server per ottenere i dati della classifica di interesse, la componente _StandingsNavBar_ provvederà a settare opportunamente le _variabili di stato_ necessarie per indicare alla componente _StandingTable_ che, al posto dei risultati della ricerca, dovrà visualizzare un apposito messaggio informativo per l'utente.

**Nota**: alla componente _StandingsNavBar_ vengono anche forniti in input dalla componente padre, tramite _props_, tutti i dati necessari per gestire le varie situazioni di errore riportate fino ad ora. 

<h3>Componente StandingTable</h3>

La componente _StandingTable_ si occupa di renderizzare, in formato tabellare, i dati della classifica ottenuta come risultato della ricerca effettuata dall'utente. 

Più precisamente, per ogni squadra presente nella classifica, i dati che vengono visualizzati sono:
- identificativo della squadra (non viene direttamente visualizzato ma è necessario per una renderizzazione efficiente);
- nome della squadra;
- numero di partite giocate in totale;
- numero di partite vinte;
- numero di partite perse;
- percentuale di vittorie.

Tutti i dati sopra riportati vengono forniti in input dalla componente padre sotto forma di _props_.

Tuttavia, se la classifica ottenuta dalla ricerca dovesse risultare completamente **vuota** oppure, come anticipato nella sezione precedente, se in _StandingsNavBar_ la chiamata al server per ottenere i dati della classifica di interesse dovesse fallire, allora la componente _StandingTable_ provvederà a visualizzare un apposito messaggio informativo per l’utente.

Inoltre, qualora si clicchi sul nome di una delle squadre di questa classifica (che, come detto in precedenza, sono riportati in formato tabellare assieme agli altri dati ottenuti come risultato della ricerca), si avviserà la componente _StandingView_ che dovrà visualizzare la componente con le informazioni relative a tale squadra, la quale richiederà in input il **nome della squadra** stessa.

**Nota**: finchè non viene effettuata una ricerca con tutti i dati necessari (cioè stagione e conference), la componente _StandingTable_ risulterà essere completamente vuota in quanto, appunto, non ci sono ancora dei risultati da visualizzare.

**Nota**: alla componente _StandingTable_ vengono anche forniti in input dal componente padre, tramite _props_, tutti i dati necessari per gestire le varie situazioni di errore riportate fino ad ora.

<h2>Backend</h2>

Il lato server per _Visualizzazione Classifiche_ è implementato tramite due API, che si connettono ad una API esterna da cui vengono ottenuti tutti i dati da visualizzare. Queste API sono:
1. _seasonsAPI_ che è stata mappata sull’endpoint ‘_/seasons_’;
2. _standingsAPI_ che è stata mappata sull’endpoint ‘_/standings_'. 

Ognuna di queste API riceve la richiesta da parte del client assieme alle info necessarie ad ottenere le informazioni dall'API esterna (_seasonsAPI_ non necessita di alcuna info dal client, mentre _standingsAPI_ richiede la stagione e la conference di interesse), e restituisce come risposta i dati da utilizzare nella rispettiva componente frontend, riportando come codice di stato il valore **200**. Qualora si verificasse un errore invece, la risposta riporterà tale errore sotto forma di messaggio e lo stato della risposta sarà **400**.

**Nota**: l'API esterna connessa a _standingsAPI_ richiede, obbligatoriamente, che le venga fornita anche la _league_ di riferimento; poichè attualmente consideriamo solamente la _standard league_, questo parametro viene settato direttamente nel server e per questo non è necessario che il client fornisca anche la _league_ insieme alle altre info.

**Nota**: l’elenco delle squadre nella risposta del server viene ordinato in modo decrescente rispetto alla _percentuale di vittorie_ delle squadre, così da avere una classifica ordinata dalla migliore alla peggiore.

<hr/><hr/>

<h1>Classifiche Per Squadra</h1>

<h2>Frontend</h2>

La visualizzazione delle classifiche per squadra è articolata in 3 componenti funzione:

1. StandingsPerTeamView
2. StandingsPerTeamNavBar
3. StandingsPerTeamTable

L’**obiettivo** è quello di visualizzare le informazioni principali riguardandi il posizionamento in classifica di una certa squadra, nelle varie stagioni disponibili.

<h3>Componente StandingsPerTeamView</h3>

_StandingsPerTeamView_ è la componente ‘padre’ che renderizza le altre 2 e fornisce loro le variabili di stato e le funzioni di cui hanno bisogno per funzionare correttamente.

Oltretutto, _StandingsPerTeamView_ è anche responsabile del passaggio alla visualizzazione delle informazioni di una squadra di interesse quando richiesto e, per tale motivo, riceve in input tramite _props_ sia i dati che le funzioni necessari per gestire tale visualizzazione.

<h3>Componente StandingsPerTeamNavBar</h3>

La componente _StandingsPerTeamNavBar_ implementa la sezione di pagina che permette all'utente di impostare ed effettuare la ricerca delle classifiche per una certa squadra. 

Più precisamente, tale componente è composta da:
- un drop-down menu per selezionare la squadra;
- un pulsante per avviare la ricerca.

Al caricamento di questa componente avviene la chiamata GET al server per ottenere l’elenco delle squadre disponibili, che verranno visualizzate nell'apposito drop-down menu.

Inoltre, quando si clicca sul pulsante della ricerca, prima avviene la chiamata GET al server per ottenere l'elenco delle stagioni disponibili, dopodichè si effettuano una serie di altre chiamate GET al server per ricavare le classifiche nelle stagioni precedentemente ottenute e infine da queste classifiche si estrapolano solo i dati relativi alla squadra selezionata nel drop-down menu, i quali verranno poi visualizzati nella componente _StandingsPerTeamTable_. Però se per alcune stagioni il server dovesse restituire delle classifiche **vuote**, allora queste ultime non saranno poi comunicate a _StandingsPerTeamTable_ (e quindi non verranno visualizzate).

Tuttavia, se la chiamata al server per ottenere l'elenco delle squadre dovesse fallire oppure se si tentasse di effettuare una ricerca senza aver prima selezionato la squadra di interesse, allora la componente _StandingsPerTeamNavBar_ provvederà a visualizzare un apposito messaggio informativo per l’utente.


**Nota**: nel caso fallisca una delle altre chiamate al server sopra elencate, allora la componente _StandingsPerTeamNavBar_ provvederà a settare opportunamente le _variabili di stato_ neccesarie per indicare alla componente _StandingsPerTeamTable_ che, al posto dei risultati della ricerca, dovrà visualizzare un apposito messaggio informativo per l'utente. 

**Nota**: alla componente _StandingsPerTeamNavBar_ vengono anche forniti in input dalla componente padre, tramite _props_, tutti i dati necessari per gestire le varie situazioni di errore riportate fino ad ora. 

<h3>Componente StandingsPerTeamTable</h3>

La componente _StandingsPerTeamTable_ si occupa di renderizzare l’elenco delle classifiche della squadra di interesse, ottenuto come risultato della ricerca effettuata dall'utente.

Più precisamente:

- prima vengono visualizzati il logo, il nome e la conference della squadra in questione;
- dopodichè viene visualizzata una tabella che riporta i dati sulla classificazione della squadra per ogni stagioni, e questi dati sono:
    - identificativo della squadra (non viene direttamente visualizzato ma è necessario per una renderizzazione efficiente);
    - stagione;
    - posizione in classifica;
    - numero di partite giocate in totale;
    - numero di partite vinte;
    - numero di partite perse;
    - percentuale di vittorie.

Tutti i dati sopra riportati vengono forniti in input dalla componente padre sotto forma di _props_.

Tuttavia, se l'elenco delle classifiche da visualizzare dovesse risultare completamente **vuoto** oppure, come anticipato nella sezione precedente, se in _StandingsPerTeamNavBar_ una delle chiamate al server per ottenere i dati delle classifiche dovesse fallire, allora la componente _StandingsPerTeamTable_ provvederà a visualizzare un apposito messaggio informativo per l’utente.

Inoltre, qualora si clicchi sul nome della squadra (che è riportato appena sopra la tabella coi risultati della ricerca), si avviserà la componente _StandingsPerTeamView_ che dovrà visualizzare la componente con le informazioni relative a tale squadra, la quale richiederà in input il **nome della squadra** stessa.

**Nota**: i risultati nella tabella sono ordinati in maniera crescente, in base alla stagione.

**Nota**: finchè non viene effettuata una ricerca, la componente _StandingsPerTeamTable_ risulterà essere completamente vuota in quanto, appunto, non ci sono ancora dei risultati da visualizzare.

**Nota**: alla componente _StandingsPerTeamTable_ vengono anche forniti in input dalla componente padre, tramite _props_, tutti i dati necessari per gestire le varie situazioni di errore riportate fino ad ora.

<h2>Backend</h2>

Il lato server per _Classifiche Per Squadra_ è implementato tramite tre API, che si connettono ad una API esterna da cui vengono ottenuti tutti i dati da visualizzare. Queste API sono:
1. _teams_ che è stata mappata sull’endpoint ‘_/teams_';
2. _seasonsAPI_ che è stata mappata sull’endpoint ‘_/seasons_’;
3. _standingsAPI_ che è stata mappata sull’endpoint ‘_/standings_'. 

Ognuna di queste API riceve la richiesta da parte del client assieme alle info necessarie ad ottenere le informazioni dall'API esterna (_seasonsAPI_ e _teams_ non necessitano di alcuna info dal client, mentre _standingsAPI_ richiede la stagione e la conference di interesse), e restituisce come risposta i dati da utilizzare nella rispettiva componente frontend, riportando come codice di stato il valore **200**. Qualora si verificasse un errore invece, la risposta riporterà tale errore sotto forma di messaggio e lo stato della risposta sarà **400**.

**Nota**: l'API esterna connessa a _standingsAPI_ richiede, obbligatoriamente, che le venga fornita anche la _league_ di riferimento; poichè attualmente consideriamo solamente la _standard league_, questo parametro viene settato direttamente nel server e per questo non è necessario che il client fornisca anche la _league_ insieme alle altre info.

<hr/><hr/>

<h1>Ricerca Partite Per Data</h1>

<h2>Frontend</h2>

La visualizzazione della ricerca delle partite per data si suddivide in 3 componenti:
- _GamesPerDateView_;
- _CalendarAndButton_;
- _GamesTable_.

<h3>Componente GamesPerDateView</h3>

Si tratta del componente padre per quanto riguarda la visualizzazione della ricerca delle partite per data, infatti al suo interno renderizza gli altri 2 componenti e gli fornisce le variabili di stato di cui hanno bisogno per un corretto funzionamento.

Tra queste variabili è presente _games_, che contiene le partite ottenute dalla ricerca. Ogni partita contiene le seguenti informazioni:
- _id_: ID della partita;
- _homeTeam_: Squadra che gioca in casa;
- _teamLogoHome_: Logo della squadra che gioca in casa;
- _visitorTeam_: Squadra che gioca in trasferta;
- _teamLogoVisitors_: Logo della squadra che gioca in trasferta;
- _homeScore_: Punteggio della squadra che gioca in casa;
- _visitorScore_: Punteggio della squadra che gioca in trasferta;
- _status_: Valore numerico che indica se la partita è terminata, in corso o non ancora iniziata;
- _type_: Stringa che indica se la partita è terminata, in corso o non ancora iniziata;
- _time_: Orario della partita;
- _currentPeriods_: Numero attuale di quarti giocati;
- _totalPeriods_: Numero totale di quarti che si giocano in una partita, ossia 4;
- _linescoreHome_: Punteggio per quarto per la squadra che gioca in casa;
- _linescoreVisitors_: Punteggio per quarto per la squadra che gioca in trasferta.

<h3>Componente CalendarAndButton</h3>

Si tratta del componente che implementa la visualizzazione del calendario da cui l'utente seleziona una data e del bottone che l'utente clicca per avviare la ricerca.

In questo componente avviene la chiamata GET al server per ottenere i dati da visualizzare. Questa chiamata ha come parametro la data selezionata dall'utente nel calendario formattata nel modo corretto.

<h3>Componente GamesTable</h3>

Si tratta del componente che implementa la visualizzazione dei risultati della ricerca effettuata dall'utente. Vi sono diverse visualizzazioni in base ai risultati ottenuti:
- Se la richiesta al server è fallita, viene renderizzato il messaggio _Servizio al momento non disponibile a causa dell'indisponibilità dell'API remota_ per informare l'utente;
- Se la richiesta al server è andata a buon fine e non vi sono partite per la data selezionata dall'utente, viene renderizzato il messaggio _Non vi sono partite per la data selezionata_ per informare l'utente;
- Se la richiesta al server è andata a buon fine e vi sono partite per la data selezionata dall'utente, viene renderizzata la tabella contenente tali partite.

<h2>Backend</h2>

Per la gestione lato server della ricerca delle partite per data è stata implementata l'API _gamesPerDate_, che si connette ad un'[API esterna](https://rapidapi.com/api-sports/api/api-nba) da cui vengono ottenuti tutti i dati da visualizzare.

Quest'API riceve dal client la data selezionata dall'utente e:
- Se tutto ok, restituisce un array contenente le partite della data selezionata ordinate in base all'orario con relativo status code settato a 200;
- Se vi è un errore, restituisce il messaggio d'errore con relativo status code settato a 400.

<hr/><hr/>

<h1>Partite per Squadra</h1>

<h2>Frontend</h2>

La visualizzazione delle partite relative ad una squadra per una data stagione viene implementata attraverso le componenti:

1. GamesPerTeam
2. GamesPerTeamNavbar
3. GamesPerTeamMatch
4. GamesPerTeamTable

<h3>Componente GamesPerTeam</h3>

_GamesPerTeam_ è la componente padre utilizzata per gestire le interazioni principali tra le altre tre oltre all'interazione con la componente _GameInfo_. 

<h3>Componente GamesPerTeamNavbar</h3>

Questa componente implementa il menu di selezione della squadra e della stagione (due menu a tendina) compreso di bottone necessario ad avviare la ricerca, oltre alle chiamate al server per ottenere le stagioni disponibili, le squadre NBA, e una volta selezionate le info necessarie, la lista di partite per squadra e stagione. Le chiamate al server avvengono **tutte** qui.

<h3>Componente GamesPerTeamMatch</h3>

Renderizza in formato _table row_ una partita dell'elenco di partite ottenute dalla componente _GamesPerTeamNavbar_. Tutti i dati visualizzati vengono ottenuti in input dalla componente _GamesPerTeamTable_ sotto forma di _prop_. Le informazioni mostrate sono (per ciascuna delle due squadre che hanno giocato o giocheranno in tale partita):

- Status partita (programmata, in corso o finita);
- Nome della squadra;
- Logo della squadra;
- Punti segnati;
- Data;
- Quarto attuale;
- Punti per quarto.

Inoltre, è presente un bottone che se cliccato rimanda alla componente _GameInfo_.

<h3>Componente GamesPerTeamTable</h3>

Renderizza in formato tabellare le informazioni relative alle partite della squadra e stagione selezionate. Tutti i dati visualizzati vengono prima ottenuti in input dalla componente _GamesPerTeamNavbar_, e poi viene costruita la tabella richiamando per ogni partita la componente _GamesPerTeamMatch_, costruendo e popolando così ogni riga della tabella finale. 

<h2>Backend</h2>

Il lato server per la visualizzazione delle partite relative a una squadra e stagione è implementato tramite tre API che si connettono all'[API esterna](https://rapidapi.com/api-sports/api/api-nba) da cui vengono ottenuti tutti i dati da visualizzare. Queste API, presenti in "server/routes", sono:

1. seasonsAPI;
2. teams;
3. gamesPartitePerSquadra.

Ognuna di queste riceve la richiesta da parte del client dalla componente _GamesPerTeamNavbar_. Qualora si verificasse un errore, la risposta riporterà tale errore sotto forma di messaggio e lo stato della risposta sarà **400**.

<hr/><hr/>

<h1>Ricerca Giocatore per Nome</h1>

<h2>Frontend</h2>

La funzionalità di ricerca dei giocatori che corrispondono ad un determinato nome e/o cognome utilizza due principali componenti 

1. InputFirstLastName
2. PlayersTable

Tali componenti vengono gestiti e visualizzati in base al valore delle variabili (passate via props) presenti nel componente padre "SearchPlayer". <br>
Alla creazione di tale componente, vengono effettuate due chiamate per reperire tutte le squadre dell'NBA (id, nome e logo) efffettuando al server passando la conference _east_ e un'altra passando quella _west_. Il risultato sarà una lista con tutte le informazioni utili alla visualizzazione delle squadre. Infatti, la lista verrà passata a _PlayersTable_ 

<h3>Componente InputFirstLastName</h3>

_InputFirstLastName_ è la componente che visualizza le caselle di testo _firstname_ e _lastname_ e il pulsante di ricerca. Ad ogni _onChange_ delle caselle di testo viene salvato il valore modificato nella variabile associata (es. _props.firstname_). Una volta premuto il pulsante, vengono avviate le chiamate GET al server (_searchPlayerFirstname_ e _searchPlayerFirstname_) per reperire le liste dei giocatori passando le relative variabili (vi sono delle condizioni per evitare di fare chiamate inutili, come verificare che le var. siano diverse da null). Le liste ricevute dalla chiamata vengono salvate nel componente padre che le passerà al _PlayersTable_ per la visualizzazione 
</details>

<h3>Componente PlayersTable</h3>

Inizialmente, viene effettuata una verifica che tutto sia andato a buon fine e, nel caso, verifica le due liste di _firstname_ e _lastname_ per effettuare un'intersezione. Una volta generata la lista conclusiva, ad ogni giocato viene aggiunto il campo del logo della squadra a cui appartiene.
Infine, esso renderizza in formato tabellare le informazioni generali relative al giocatore identificato dall'id; queste informazioni sono:

- Nome "firstname";
- Cognome "lastname";
- Logo "logo";
- Data di nascita "birth";

Nel caso in cui alcune di queste informazioni manchino, non verrà visualizzato alcuna informazione. Tutti i dati visualizzati vengono ottenuti in input dalla componente padre sotto forma di _prop_.

<h2>Backend</h2>

Vi sono 3 principali funzioni:

- searchPlayerFirstname
- searchPlayerLastname
- searchTeamLogo

Le prime due ricevono in input le corrispettive variabili _firstname_ e _lastname_ dove effettueranno le chiamate _players/firstname_ e _players/lastname_ utilizzando la versione 1 delle API. Verranno restituite le variabili per giocatore:
 - id: element.playerId
 - firstname: element.firstName
 - lastname: element.lastName
 - teamid: element.teamId
 - birth: element.dateOfBirth

L'ultima chiamata, invece, viene utilizzata per reperire le seguenti informazioni di tutte le squadre dell'NBA:
 - id: element.id
 - name: element.name
 - logo: element.logo

Tale chiamata serve per visualizzare il logo (se presente) della squadra a cui appartiene il giocatore.

<hr/><hr/>

<h1>Ricerca Squadra per Nome</h1>

<h2>Frontend</h2>

La funzionalità di ricerca delle squadre che presenta un determinato nome utilizza due principali componenti 

1. InputName
2. TeamsTable

Tali componenti vengono gestiti e visualizzati in base al valore delle variabili (passate via props) presenti nel componente padre "SearchTeam". <br>
Alla creazione di tale componente, viene effettuata una chiamata per reperire tutte le squadre dell'NBA (id, nome, logo, nickname, code e city) al server passando la conference _no_. In pratica viene riutilizzata la chiamata che veniva effettuata nella funzionalità _ricercaGiocatorePerNome_. Il risultato sarà una lista con tutte le informazioni utili alla visualizzazione delle squadre. Infatti, la lista verrà ristretta e, successivamente, passata a _PlayersTable_. 

<h3>Componente InputName</h3>

_InputName_ è la componente che visualizza la casella di testo _name_. Ad ogni _onChange_ delle caselle di testo viene salvato il valore modificato nella variabile passato via props e la lista delle suqadre viene ristretta osservando per ogni squadra se all'interno del nome è presente la stringa nella casella di test. La lista risultante viene salvata in una variabile _teamsRes_ del componente padre. 
</details>

<h3>Componente TeamsTable</h3>

Inizialmente, viene effettuata una verifica che tutto sia andato a buon fine e, nel caso, verifica che la lista _teamsRes_ non sia vuota, visualizzando un messaggio informativo.
Dopodichè, esso renderizza in formato tabellare le informazioni generali relative alla squadra identificata dall'id; queste informazioni sono:

- Logo "logo";
- Nome "name";
- Nickname "nickname";
- Code "code";
- City "city";

Nel caso in cui alcune di queste informazioni manchino, non verrà visualizzato alcuna informazione. Tutti i dati visualizzati vengono ottenuti in input dalla componente padre sotto forma di _prop_.
Se la lista ha più di una squadra viene utlizzata tale compoenente, altrimenti verranno visualizzate direttamente le informazioni più dettagliate della squadra richiamando il componente di _visualizzazioneInformazioniSquadra_.

<h2>Backend</h2>

Viene riutilizzata una funzione _searchTeamLogo_

La chiamata serve a reperire le seguenti informazioni di tutte le squadre dell'NBA:
 - id: element?.id
 - name: element?.name
 - nickname: element?.nickname
 - code: element?.code
 - logo: element?.logo
 - city: element?.city

Viene passato un parametro conference dove il valore è _no_, infatti c'è una condizione ad inizio chiamata dove controlla la variabile per capire se effettuare la chiamata con paramentro conference oppure no. 

<hr/><hr/>

<h1>Formazione Vincente</h1>

<h2>Frontend</h2>

La visualizzazione della formazione vincente si suddivide in 3 componenti:
- _WinningTeamView_;
- _WinningTeamSearch_;
- _WinningTeamTable_.

<h3>Componente WinningTeamView</h3>

Si tratta del componente padre per quanto riguarda la visualizzazione della formazione vincente, infatti al suo interno renderizza gli altri 2 componenti e gli fornisce le variabili di stato di cui hanno bisogno per un corretto funzionamento.

Tra queste variabili vi sono:
- _winningGames_: contiene gli ID delle partite vinte dalla squadra selezionata nella stagione selezionata;
- _statistics_: contiene informazioni relative ai giocatori che sono stati titolari nelle varie partite (compreso il ruolo).

<h3>Componente WinningTeamSearch</h3>

Questo componente implementa la visualizzazione dei seguenti elementi:
- Menù a tendina delle squadre, da cui l'utente seleziona la squadra di interesse;
- Menù a tendina delle stagioni, da cui l'utente seleziona la stagione di interesse;
- Bottone che l'utente clicca per avviare la ricerca.

In questo componente avvengono le chiamate GET al server per ottenere le squadre NBA e le stagioni. Vengono poi effettuate altre 2 chiamate per ottenere i dati utili per effettuare il calcolo della formazione vincente.

<h3>Componente WinningTeamTable</h3>

Si tratta del componente che implementa la visualizzazione dei risultati della ricerca effettuata dall'utente. Vi sono diverse visualizzazioni in base ai risultati ottenuti:
- Se la richiesta al server è fallita, viene renderizzato il messaggio _Servizio al momento non disponibile a causa dell'indisponibilità dell'API remota_ per informare l'utente;
- Se la richiesta al server è andata a buon fine, ma l'API remota contiene dati errati, viene renderizzato il messaggio _Risultati non disponibili per questi parametri, perché l'API remota contiene dati errati_ per informare l'utente;
- Se la richiesta al server è andata a buon fine e l'API remota contiene dati corretti, viene renderizzata la lista di giocatori che fanno parte della formazione vincente con il numero di vittorie di tale formazione e il numero di vittorie totale della squadra.

<h2>Backend</h2>

Per la gestione lato server della formazione vincente sono state implementate le API descritte di seguito, che si connettono ad un'[API esterna](https://rapidapi.com/api-sports/api/api-nba) per ottenere i dati necessari:

L'API _teams_:
- Se tutto ok, restituisce un array contenente le squadre NBA in ordine alfabetico con relativo status code settato a 200;
- Se vi è un errore, restituisce il messaggio d'errore con relativo status code settato a 400.

L'API _seasons_:
- Se tutto ok, restituisce un array contenente le stagioni in ordine crescente con relativo status code settato a 200;
- Se vi è un errore, restituisce il messaggio d'errore con relativo status code settato a 400.

L'API _gamesPerTeamAndSeason_:
- Se tutto ok, restituisce un array contenente gli ID delle partite vinte da una certa squadra in una determinata stagione con relativo status code settato a 200;
- Se vi è un errore, restituisce il messaggio d'errore con relativo status code settato a 400.

L'API _playerStatisticsPerTeamAndSeason_:
- Se tutto ok, restituisce un array contenente informazioni relative ai giocatori che sono stati titolari nelle varie partite (compreso il ruolo) con relativo status code settato a 200;
- Se vi è un errore, restituisce il messaggio d'errore con relativo status code settato a 400.

<hr/><hr/>

<h1>Visualizzazione Informazioni Partita</h1>

<h2>Frontend</h2>

La visualizzazione delle informazioni relative ad una partita viene implementata attraverso le componenti:

1. GameInfo
2. GameInfoGeneralInfo
3. GameInfoStatistics
4. GameInfoPlayers
5. GameInfoNavBar

<h3>Componente GameInfo</h3>

_GameInfo_ è la componente padre che renderizza le altre 4. Qui avvengono le chiamate GET al server per ottenere i dati da visualizzare. Al fine di effettuare queste chiamate, la componente riceverà in input l'id di una partita sotto forma di _prop_, che passerà al server durante la GET.
</details>

<h3>Componente GameInfoGeneralInfo</h3>

Renderizza in formato tabellare le informazioni generali relative alla partita identificata dall'id; queste informazioni sono:

- Nome squadra "home";
- Nome squadra "visitors";
- Logo squadra "home";
- Logo squadra "visitors;
- Punteggio squadra "home";
- Punteggio squadra "visitors";
- Nome arena;
- Città in cui si trova l'arena;
- Stato in cui si trova tale città.

Nel caso in cui alcune di queste informazioni manchino, ad esempio se la partita selezionata non è stata ancora giocata, verrà visualizzato un apposito messaggio informativo. Tutti i dati visualizzati vengono ottenuti in input dalla componente padre sotto forma di _prop_. 
I nomi delle squadre in questa tabella sono cliccabili, e rimandano alla componente _VisualizzazioneInformazioniSquadra_.

<h3>Componente GameInfoStatistics</h3>

Renderizza in formato tabellare le statistiche di gioco approfondite relative alle due squadre nel caso l'utente le voglia visualizzare; la visualizzazione è gestita tramite bottone descritto in seguito (vedi _GameInfoNavBar_). Le informazioni mostrate sono (per ciascuna delle due squadre):

- Logo della squadra;
- "Field goals made";
- "Field goals attempted";
- "Field goals percentage";
- "Free throws made";
- "Free throws attempted";
- "Free throws percentage";
- "3-pointers made";
- "3-pointers attempted";
- "3-pointers percentage";
- "Total rebounds";
- "Offensive rebounds";
- "Defensive rebounds";
- "Assists";
- "Personal fouls";
- "Steals";
- "Turnovers";
- "Blocks";
- "Points in the paint";

Nel caso in cui queste informazioni manchino, ad esempio se la partita selezionata non è stata ancora giocata, verranno visualizzati appositi messaggi informativi. Tutti i dati visualizzati vengono ottenuti in input dalla componente padre sotto forma di _prop_.

<h3>Componente GameInfoPlayers</h3>

Renderizza in formato tabellare le statistiche di gioco approfondite relative ai giocatori di una delle due squadre, in base alla decisione che viene presa dall'utente tramite appositi pulsanti descritti in seguito (vedi _GameInfoNavBar_); queste informazioni sono (per ciascun giocatore delle due squadre):

- Logo della squadra;
- Squadra di appartenenza ("_home_" o "_visitors_");
- Nome giocatore;
- Cognome giocatore;
- Posizione di gioco;
- "Total rebounds";
- "Assists";
- Punti segnati;
- Minuti di gioco;

Nel caso in cui queste informazioni manchino, ad esempio se la partita selezionata non è stata ancora giocata, verranno visualizzati appositi messaggi informativi. Tutti i dati visualizzati e/o necessari alla visualizzazione vengono ottenuti in input dalla componente padre sotto forma di _prop_.
I nomi dei giocatori in questa tabella sono cliccabili, e rimandano alla componente _VisualizzazioneInformazioniGiocatore_, la cui tabella verrà visualizzata al posto di quella corrente delle statistiche. Anche qui vale la stessa interazione con i bottoni della barra di navigazione descritta qui di seguito.

<h3>Componente GameInfoNavBar</h3>

Realizza una sorta di barra di navigazione composta da 4 bottoni:

1. "stats_button": se premuto, visualizza sotto alla tabella di "_GameInfoGeneralInfo_" la tabella di "_GameInfoStatistics_", eventualmente sostituendo quella di "_GameInfoPlayers_" qualora sia presente al momento in cui il bottone viene premuto;
2. "home_button": se premuto, visualizza sotto alla tabella di "_GameInfoGeneralInfo_" la tabella di "_GameInfoPlayers_", eventualmente sostituendo quella di "_GameInfoStatistics_" qualora sia presente al momento in cui il bottone viene premuto;
3. "visitors_button": analogo al precedente;
4. "cancel_button": se premuto, rimuove (se presente) qualunque delle tabelle visionabili con i precedenti bottoni, lasciando solo quella di "_GameInfoGeneralInfo_".

NOTA: al più una delle tre tabelle, tra quella delle statistiche per le due squadre, le statistiche dei giocatori per la squadra "_home_" e quella per la squadra "_visitors_" viene mostrata sotto a quella delle informazioni generali. Se una è già selezionata (e quindi è mostrata a schermo), e ne viene selezionata un'altra, questa sostituirà quella precedentemente visualizzata. 

Nel caso in cui non vi siano informazioni disponibili alla visualizzazione, i bottoni rimangono attivi e premibili; verrà all'occorrenza visualizzato un messaggio che informerà l'utente che le informazioni desiderate non sono disponibili.

<h2>Backend</h2>

Il lato server per la visualizzazione delle informazioni relative a una partita è implementato tramite tre API che si connettono ad un [API esterna](https://rapidapi.com/api-sports/api/api-nba) da cui vengono ottenuti tutti i dati da visualizzare. Queste API, presenti in "server/routes", sono:

1. gamePerId;
2. gameStatisticsPerId;
3. gamePlayerPerId.

Ognuna di queste riceve la richiesta da parte del client assieme alle info necessarie ad ottenere le informazioni dall'API esterna (per tutte e tre, l'id della partita), e restituisce come risposta i dati da visualizzare nella rispettiva componente, riportando come codice di stato il valore **200**. Qualora si verificasse un errore invece, la risposta riporterà tale errore sotto forma di messaggio e lo stato della risposta sarà **400**.

<hr/><hr/>

<h1>Visualizzazione Informazioni Giocatore</h1>

<h2>Frontend</h2>

La visualizzazione delle informazioni relative ad un giocatore viene implementata attraverso le componenti:

1. PlayerInfo
2. PlayerInfoTable

<h3>Componente PlayerInfo</h3>

_PlayerInfo_ è la componente padre che renderizza l'altra. Qui avvengono le chiamate GET al server per ottenere i dati da visualizzare. Al fine di effettuare queste chiamate, la componente riceverà in input l'id di un giocatore sotto forma di _prop_, che passerà al server durante la GET.
</details>

<h3>Componente PlayerInfoTable</h3>

Renderizza in formato tabellare le informazioni generali relative al giocatore identificato dall'id; queste informazioni sono:

- Nome "firstName";
- Cognome "lastName";
- Data di nascita "birthday";
- Età (calcolata sulla base della data di nascita e della data odierna);
- Altezza "height";
- Peso "weight";
- Numero di maglia "jersey";
- Posizione di gioco "role";
- Anno in cui ha debuttato nell'NBA "nba_start";
- College frequentato "college";
- Nome della squadra in cui gioca "team.name";
- Immagine della squadra in cui gioca "team.logo".

Nel caso in cui alcune di queste informazioni manchino, verrà visualizzato un apposito messaggio informativo. Tutti i dati visualizzati vengono ottenuti in input dalla componente padre sotto forma di _prop_.

<h2>Backend</h2>

Il lato server per la visualizzazione delle informazioni relative a un giocatore è implementato tramite tre API che si connettono ad un [API esterna](https://rapidapi.com/api-sports/api/api-nba) da cui vengono ottenuti tutti i dati da visualizzare. Queste API, presenti in "server/routes", sono:

1. playerPerId;
2. seasonsAPI;
3. playerStatisticsPerIdAndSeason.

Ognuna di queste riceve la richiesta da parte del client assieme alle info necessarie ad ottenere le informazioni dall'API esterna (per la prima, l'id del giocatore, per la seconda nessuna, e per la terza l'id del giocatore e la stagione ottenuta dalla precedente), e restituisce come risposta i dati da visualizzare nella rispettiva componente, riportando come codice di stato il valore **200**. Qualora si verificasse un errore invece, la risposta riporterà tale errore sotto forma di messaggio e lo stato della risposta sarà **400**.

<hr/><hr/>

<h1>Visualizzazione Informazioni Squadra</h1>

<h2>Frontend</h2>

La visualizzazione delle informazioni relative ad una squadra è articolata in 3 componenti funzione:

1. TeamInfo
2. TeamInfoTable
3. PlayersList

L’**obiettivo** è quello di visualizzare le informazioni principali di una certa squadra, nonché l’elenco dei giocatori che hanno fatto parte di quella squadra nell’ultima stagione disponibile.

<h3>Componente TeamInfo</h3>

_TeamInfo_ è la componente ‘padre’ che renderizza le altre 2.

Qui avvengono le chiamate GET al server, prima per ottenere l’ultima stagione disponibile e poi per ricavare i dati della squadra da visualizzare; queste chiamate sono effettuate in successione appena la componente viene caricata. Per effettuare la chiamata relativa alla stagione non sono necessari parametri, mentre per compiere la chiamata relativa ai dati della squadra la componente riceverà in input il **nome di una squadra** sotto forma di _props_, e passerà al server sia questo nome di squadra sia la stagione ottenuta precedentemente.

Tuttavia, se una delle chiamate al server dovesse _fallire_, la componente _TeamInfo_ provvederà a visualizzare un apposito messaggio informativo per l’utente.

Oltretutto, _TeamInfo_ è anche responsabile del passaggio alla visualizzazione delle informazioni di un certo giocatore della squadra quando richiesto.

**Nota**: inoltre la componente _TeamInfo_ ‘scompone’ l’elenco dei giocatori in una collezione di sotto-elenchi di giocatori. Ciò tornerà utile nella componente _PlayersList_.

<h3>Componente TeamInfoTable</h3>

La componente _TeamInfoTable_ si occupa di renderizzare, in formato tabellare, le informazioni relative alla squadra di cui si è fornito il nome alla componente _TeamInfo_. Queste informazioni sono:
- identificativo della squadra (non viene direttamente visualizzato ma è necessario per una renderizzazione efficiente);
- logo della squadra;
- nome della squadra;
- nickname della squadra;
- città della squadra;
- conference di appartenenza della squadra;
- divisione di appartenenza della squadra in quella conference.

Nel caso in cui ci siano delle informazioni non disponibili, al loro posto verranno visualizzati dei messaggi ‘_NA_’ (_Not Available_) per informare l’utente.

Tutti i dati sopra riportati vengono forniti in input dalla componente padre sotto forma di _props_.

<h3>Componente PlayersList</h3>

La componente _PlayersList_ si occupa di renderizzare, in formato tabellare, l’elenco dei giocatori che hanno fatto parte della squadra nell’ultima stagione disponibile. Più precisamente, per ogni giocatore vengono visualizzati:

- identificativo del giocatore;
- nominativo del giocatore (composto da nome e cognome);
- identificativo della squadra di appartenenza del giocatore.

Gli identificativi del giocatore e della squadra non vengono direttamente visualizzati ma sono necessari per una renderizzazione efficiente.

Inoltre, qualora si clicchi su uno dei giocatori di questo elenco, si avviserà la componente _TeamInfo_ che dovrà visualizzata la pagina con le informazioni relative a tale giocatore, la quale richiederà in input, appunto, l’**identificativo del giocatore** in questione (vedi la sezione della documentazione relativa a _PlayerInfo_).

Nel caso in cui l’elenco dei giocatori sia _vuoto_, al suo posto verrà visualizzato il messaggio ‘_NA_’ (_Not Available_) per informare l’utente.

Tutti i dati sopra riportati vengono forniti in input dalla componente padre sotto forma di _props_. 

**Nota**: in particolare, la componente _PlayersList_ richiede che l’elenco dei giocatori le venga fornito sotto forma di collezione di sotto-elenchi di giocatori in modo da facilitarne la visualizzazione. Infatti, nella tabella l’elenco dei giocatori sarà organizzato su tante colonne quanti sono questi sotto-elenchi.

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; _ES_: [ [player_1, player_2, …], [player_i, player_i+1, … ] ] = 2 colonne

E tale ‘scomposizione’ viene appunto effettuata nella componente _TeamInfo_ (come detto in precedenza).

<h2>Backend</h2>

Il lato server per la _Visualizzazione Informazioni Squadra_ è implementato tramite due API, che si connettono ad una API esterna da cui vengono ottenuti tutti i dati da visualizzare. Queste API sono:
1. _seasonsAPI_ che è stata mappata sull’endpoint ‘_/seasons_’;
2. _teamInfoAPI_ che è stata mappata sull’endpoint ‘_/teamInfo_’. 

Ognuna di queste API riceve la richiesta da parte del client assieme alle info necessarie ad ottenere le informazioni dall'API esterna (_seasonsAPI_ non necessita di alcuna info dal client, mentre _teamInfoAPI_ richiede il nome della squadra e la stagione di interesse), e restituisce come risposta i dati da utilizzare nella rispettiva componente frontend, riportando come codice di stato il valore **200**. Qualora si verificasse un errore invece, la risposta riporterà tale errore sotto forma di messaggio e lo stato della risposta sarà **400**.

**Nota**: in caso di successo di _teamInfoAPI_, l’elenco dei giocatori della squadra sarà rappresentato come un elenco di oggetti, ognuno dei quali conterrà: l’identificativo del giocatore e il nominativo del giocatore (composto da nome e cognome). E tale elenco sarà aggiunto al responso finale di _teamInfoAPI_ il quale sarà organizzato come un oggetto, contenente anche le altre informazioni che sono state elencate nella sezione _frontend_.