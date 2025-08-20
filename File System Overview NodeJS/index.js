const fs = require("node:fs");

// Write File
// Read File
// Update File
// Append File
// Delete File
// Folder Creation
// Copy, Rename, Move, etc..

// Writing the file...
/*
fs.writeFile("Hello.txt", "Hello My Self A Programmer", function (err) {
    if (err) console.log(err)
    else console.log("File Created Succesfull..")
});
*/

// Reading the file...
/*
fs.readFile("Hello.txt","utf8",(err,data)=>{
    if(err) console.log(err)
    else console.log(data)
})
*/

// Append File...
/*
fs.appendFile("Hello.txt"," Do You Know Me",err=>{
    if(err) console.log(err)
    else console.log("Data Appended in File Successfull..")
})
*/

// Renaming the File
/*
fs.rename("Hello.txt","HelloWorld.txt",err=>{
    if(err) console.log(err)
    else console.log("Rename the File Successfull..")
})
*/

// Deleting the File...
/*
fs.unlink("HelloWorld.txt",err=>{
    if(err) console.log(err)
    else console.log("File Deleted Successfull..")
})
*/

// Directory Operations...

// Creating Folder
/*
fs.mkdir("myFolder",err=>{
    if(err) console.log(err)
    else console.log("Folder Created Successfull..")
})
*/

// Reading Folder 
/*
fs.readdir("myFolder",{withFileTypes: true},(err,files)=>{
    if(err) console.log(err)
    else console.log(files)
})
*/

// Deleting Folder
/*
fs.rm("myFolder",{recursive:true},err=>{
    if(err) console.log(err)
    else console.log("Folder Deleted..")
})
*/

/*
You can Doing all this same things by the help of Sync Functions just write Sync on it
example :- writeFileSync() and they have no callback functions because they all are blocking level code so for that they don't contains the callbacks. So don't use this functions (rarely). Always use Async Functions.
*/

