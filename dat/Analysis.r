# Analysis of contents

# Concatenate strings: paste0(part1, part2)
# Repeatedly doing something: apply, or sapply

# Get the last letters of the name and make lists of them
numberOfCharacters <- 2:8

cleaneddata[, paste0("last", numberOfCharacters)] <- sapply(numberOfCharacters, FUN = function(v){
  tolower(substr(cleaneddata$namewithoutadditions, 
         nchar(cleaneddata$namewithoutadditions)-v+1, 
         nchar(cleaneddata$namewithoutadditions)))
})

# Count the occurences of similar strings and save those lists to a file
sapply(numberOfCharacters, FUN = function(v){
  freq <- table(cleaneddata[, paste0("last", v)])
  write.csv2(freq, file = paste0("last", v, ".csv"), row.names = F)
})