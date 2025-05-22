# Load required libraries
library(sf)        # For working with spatial data
library(leaflet)   # For interactive maps (optional)

# Set the file path (modify if needed)
data2025 <- "2025.geojson"

data2024 <- "2024.geojson"
data2023 <- "2023.geojson"
data2022 <- "2022.geojson"
data2021 <- "2021.geojson"
data2020 <- "2020.geojson"
data2019 <- "2019.geojson"
data2018 <- "2018.geojson"
data2017 <- "2017.geojson"

data_2025 <- st_read(data2025)
amenity_counts <- table(data_2025$amenity)
amenity_table <- as.data.frame(amenity_counts)
names(amenity_table) <- c("Amenity Type", "Count")

data_2024 <- st_read(data2024)
amenity_counts_24 <- table(data_2024$amenity)
amenity_table_24 <- as.data.frame(amenity_counts_24)
names(amenity_table_24) <- c("Amenity Type", "Count")

data_2023 <- st_read(data2023)
amenity_counts_23 <- table(data_2023$amenity)
amenity_table_23 <- as.data.frame(amenity_counts_23)
names(amenity_table_23) <- c("Amenity Type", "Count")

data_2022 <- st_read(data2022)
amenity_counts_22 <- table(data_2022$amenity)
amenity_table_22 <- as.data.frame(amenity_counts_22)
names(amenity_table_22) <- c("Amenity Type", "Count")

data_2021 <- st_read(data2021)
amenity_counts_21 <- table(data_2021$amenity)
amenity_table_21 <- as.data.frame(amenity_counts_21)
names(amenity_table_21) <- c("Amenity Type", "Count")

data_2020 <- st_read(data2020)
amenity_counts_20 <- table(data_2020$amenity)
amenity_table_20 <- as.data.frame(amenity_counts_20)
names(amenity_table_20) <- c("Amenity Type", "Count")

data_2019 <- st_read(data2019)
amenity_counts_19 <- table(data_2019$amenity)
amenity_table_19 <- as.data.frame(amenity_counts_19)
names(amenity_table_19) <- c("Amenity Type", "Count")

data_2018 <- st_read(data2018)
amenity_counts_18 <- table(data_2018$amenity)
amenity_table_18 <- as.data.frame(amenity_counts_18)
names(amenity_table_18) <- c("Amenity Type", "Count")

data_2017 <- st_read(data2017)
amenity_counts_17 <- table(data_2017$amenity)
amenity_table_17 <- as.data.frame(amenity_counts_17)
names(amenity_table_17) <- c("Amenity Type", "Count")