# covid-monitor
Covid-Monitor che utilizza la repo GitHub della Protezione Civile per plottare dati in un grafico.

I dati devono essere contenuti nella directory 'COVID-19', e si ottengono dalla repository ufficiale della Protezione Civile: https://github.com/pcm-dpc/COVID-19

Per aggiornare i dati é sufficiente eseguire un pull della directory git 'COVID-19'.

Il progetto é inteso per essere memorizzato su un server e acceduto via web browser. 


Problemi: 
* Non ho tempo per correggere i bug. Se qualcuno ha voglia di contribuire, é ben accetto. Per potermi contattare potete aggiungermi su Telegram: **@Chello96**
* Nelle dropdown vengono inserite tutti i campi contenuti nel .json dei dati. Ovviamente la maggior parte di questi non ha senso confrontarli. Bisognerebbe rimuoverli in automatico dal .json / fare sí che vengano ignorati.
* Non si puó rimuovere un dato una volta plottato. L'unico modo é cancellare l'intero grafico e ricostruirlo
* Non é progettato per essere mobile.
* ...find yours

Il sito é accedibile da http://federicorachelli.it/covid-monitor/