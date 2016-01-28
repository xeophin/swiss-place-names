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

# Remove unnecessary columns
columnnames <- c("OBJEKTART", "OBJEKTKLASSE_TLM", "EINWOHNERKATEGORIE", "Z")
slimmedData <- removedExonyms[, !(colnames(settlements) %in% columnnames)]

# Save to file
write.csv2(slimmedData, file = "settlements.csv", row.names = FALSE)

# MORE CLEANUP

# Remove any Canton additions (needs to be done first, otherwise we won't get all parentheses)
slimmedData$namewithoutcantons <- sub("\\s(AG|AI|AR|BE|BL|BS|FR|GE|GL|GR|JU|LU|NE|NW|OW|SG|SH|SO|SZ|TG|TI|UR|VS|VD|ZG|ZH)$", "", slimmedData$NAME)


# Remove any additions in parentheses (Like "(D)" or "(Bern)")
slimmedData$namewithoutparentheses  <- sub("\\s\\(.+\\)$", "", slimmedData$namewithoutcantons, ignore.case = TRUE)


# Also clean places than end in "Haltestelle"
# Okay, it's just one, but still ...
# It's the one that is shown when you search for "test", so that's a bit embarassing.
slimmedData$namewithoutparentheses <- sub("\\s(haltestelle)$", "", slimmedData$namewithoutparentheses, ignore.case = TRUE)

# Remove any differentiating additions like "b. Burgdorf" or "am"
slimmedData$namewithoutadditions <- sub("\\s(b\\.|am|an der)\\s?(.+)$", "", slimmedData$namewithoutparentheses, ignore.case = TRUE)

# Remove additional unecessary colums (again) and save the file.
cleaneddata <- slimmedData[, !(colnames(slimmedData) %in% c("namewithoutparentheses", "namewithoutcantons", "NAME_UUID", "SPRACHCODE", "NAMEN_TYP", "NAMENGRUPPE_UUID"))]
write.csv2(cleaneddata, file = "cleanedNames.csv", row.names=F)