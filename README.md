# COTree
NYCDA-PROJECT




//DATABSE: Putting the KENTEKEN info from RDW in the DB table kentekens
        Go To:
        https://opendata.rdw.nl/Voertuigen/Open-Data-RDW-Gekentekende_voertuigen_brandstof/8ys7-d773
          -Hide all columns accept the columns: <Kenteken>, <Brandstof omschrijving>, <Brandstof verbruik gecombineerd>
           Do this by clicking the menu icon right at the collumns and klik "Kolom Verbergen"
          -Click on the dark blue filteren button at the colored buttons on the top right
           Now "Voeg een nieuwe filtervoorwaarde toe"
            Add->Brandstofomschrijving is 
                Add->Diesel
                Add->Benzine
                And select them both to filter the data

          -Click on the lightblue exporteren button at the colored buttons on the top right
            -click on "Downloaden as CSV file"

        In PSQL:
        Go to your Cotree database

        Enter the following:

        \COPY kentekens (kenteken, brandstofomschrijving, brandstofverbruikcombi) FROM 'path/file.CSV' DELIMITER ',' CSV HEADER;

        DELETE FROM kentekens WHERE brandstofverbruikcombi IS NULL;

        DELETE FROM kenteken WHERE brandstofverbruikcombi ='0';

        And now you should have the relevant licence data hooray.
