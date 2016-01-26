# Read in data
fulldata <- read.csv2("swissNAMES3D_PLY.csv", 
                      encoding = "ISO8859-1", 
                      stringsAsFactors = FALSE,
                      sep = ";")

# Fix encoding of names
Encoding(fulldata$NAME) <- "latin1"

# Take only places
settlements <- subset(fulldata, OBJEKTART == "Ort")

# Take only Simple Names and Endonyms
removedExonyms <- subset(settlements, NAMEN_TYP %in% c("Endonym", "Einfacher Name"))

removedExonyms <- subset(removedExonyms, SPRACHCODE == "Hochdeutsch inkl. Lokalsprachen")

# Remove unnecessary columns
columnnames <- c("OBJEKTART", "OBJEKTKLASSE_TLM", "EINWOHNERKATEGORIE", "Z")
slimmedData <- removedExonyms[, !(colnames(settlements) %in% columnnames)]

# Save to file
write.csv2(slimmedData, file = "settlements.csv", row.names = FALSE)

# MORE CLEANUP
# Remove any additions in parentheses (Like "(D)" or "(Bern)")
slimmedData$namewithoutparentheses  <- sub("\\s\\(.+\\)$", "", slimmedData$NAME, ignore.case = TRUE)

# Remove any Canton additions
slimmedData$namewithoutcantons <- sub("\\s(AG|AI|AR|BE|BL|BS|FR|GE|GL|GR|JU|LU|NE|NW|OW|SG|SH|SO|SZ|TG|TI|UR|VS|VD|ZG|ZH)$", "", slimmedData$namewithoutparentheses)
# Remove any differentiating additions like "b. Burgdorf" or "am"
slimmedData$namewithoutadditions <- sub("\\s(b\\.|am|an der)\\s?(.+)$", "", slimmedData$namewithoutcantons, ignore.case = TRUE)

# Remove additional unecessary colums (again) and save the file.
cleaneddata <- slimmedData[, !(colnames(slimmedData) %in% c("namewithoutparentheses", "namewithoutcantons", "NAME_UUID", "SPRACHCODE", "NAMEN_TYP", "NAMENGRUPPE_UUID"))]
write.csv2(cleaneddata, file = "cleanedNames.csv", row.names=F)