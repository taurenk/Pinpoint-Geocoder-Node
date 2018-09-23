# Pinpoint US Geocoder Node
A very simple geocoder built with NodeJS, Postgresql + US Census Data. This code is based off a [previous geocoding project](https://github.com/taurenk/PinPoint-Geocoder-Python) that im hoping to take a bit further.

## 

## Database Setup: Postgresql + Postgis
The geocoder relies on a Postgresql database with the Postgis extension installed and US Census data loaded into it. 
Luckily, there are some ETL scripts located in the database directory to automate the downloading, extracting and loading the TIGER Line data from the US Census FTP site. In order to run the scripts, you need to install `lftp`, `postgres` and `postgis` for command line tooling:
```
$brew install lftp
$brew install postgres
$brew install postgis
```

After the install, you can run `$bash tiger_data_loader.sh` to start the installer. I would recommend ONLY loading a small sample first, as the dataset for the entire US takes hours to fully load.

Further Reading:
- https://www2.census.gov/geo/pdfs/maps-data/data/tiger/tgrshp2017/TGRSHP2017_TechDoc.pdf
- https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/Appendix.PostgreSQL.CommonDBATasks.html#Appendix.PostgreSQL.CommonDBATasks.PostGIS

