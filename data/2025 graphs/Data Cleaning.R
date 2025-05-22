# Load the data from the CSV file
arts_centres <- read.csv("Arts_centres.csv")

# Generate a frequency table for the 'borough_name' column
art_centre_counts <- table(arts_centres$borough_name)

# Convert the table to a data frame
art_centre_counts_df <- as.data.frame(art_centre_counts)

# Display the data frame
print(art_centre_counts_df)

community_centre <- read.csv("Community_Centres_2019.csv")
community_centre_counts <- table(community_centre$borough_name)
community_centre_counts_df <- as.data.frame(community_centre_counts)
print(community_centre_counts_df)

mus_gals <- read.csv("Museums_and_Galleries_2019.csv")
mus_gals_counts <- table(mus_gals$borough_name)
mus_gals_counts_df <- as.data.frame(mus_gals_counts)
print(mus_gals_counts_df)

Theatres_2019.csv

theatres <- read.csv("Theatres_2019.csv")
theatres_counts <- table(theatres$borough_name)
theatres_counts_df <- as.data.frame(theatres_counts)
print(theatres_counts_df)