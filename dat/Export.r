# Export Data into a format that can be read by D3, and with only the data needed
# UUID could be used as the key in D3, but isn't necessary since R automatically 
# adds a unique row number that can be used as the key as well (and makes the 
# file smaller).
columnsNeeded <- c("namewithoutadditions", "E", "N")
write.csv(cleaneddata[, colnames(cleaneddata) %in% columnsNeeded], file = "../app/data/visualisationList.csv", quote = F, col.names = c("key", "name", "e", "n"))