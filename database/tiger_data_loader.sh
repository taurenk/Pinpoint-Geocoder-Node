
echo "*** PinPoint DB DataLoader ***"

SERVER=""
USERNAME="tauren"
PASSWORD=""

# Create Directories
mkdir build
mkdir build/staging
mkdir build/unzipped

# Download Census Data
echo "Downloading Test Data for (westchester) New York.. Please be Patient..."
lftp ftp2.census.gov << EOF
mirror -i "36119" /geo/tiger/TIGER2017/FEATNAMES/ ./build/staging
quit
EOF


# Unzip Census Data
echo "Unzipping Data..."
count=0
for i in ./build/staging/*.zip; do
	unzip $i -d build/unzipped/
	count=$((count+1))
done
echo "Unzipped $count records."


# Create Table Structure [from  a downloaded file]
echo "Creating Table in Database..."
shp2pgsql -p build/unzipped/tl_2013_36119_featnames.dbf feature | PGPASSWORD=$PASSWORD psql -h $SERVER -U $USERNAME -d pinpoint

# Load Records into Database
echo "Loading Database..." 

for file in ./build/unzipped/*featnames.dbf; do
	shp2pgsql -n -a $file feature | PGPASSWORD=$PASSWORD psql -h $SERVER -U $USERNAME -d pinpoint
done


# TODO; Load Place records

# run ETL stuff...
#echo "Running ETL Scripts..."
#sudo -u postgres psql pinpoint -f etl_script.sql

# TODO: Build Indexes
'

echo "Finished Loading Data."