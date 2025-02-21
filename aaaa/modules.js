
class File{
    constructor(name, extension, parent){
        this.fileName = "";
        this.extension = "";
        this.size = 0;
        this.parent = parent;
    }

    Rename(name){
        this.fileName = name;
    }

    Delete(){
        this.parent.RemoveItem(this);
    }

    Copy(targetFolder){
        targetFolder.AddItem(new File(this.fileName, this.extension, targetFolder));
    }

    Open(){

    }

    SizeCalculation(){
        switch(this.extension){

        }
    }
}

//http://101computing.net/file-size-calculations/

class Folder{
    constructor(name, parent){
        this.folderName = name;
        this.size = 0;
        this.files = [];
        this.parent = parent;
    }

    SizeCalculation(){
        let sum = 0;
        this.files.forEach(file =>{
            sum += file.size;
        });
        return sum;
    }

    AddItem(item){
        let counter = 0;
        let occupiedNumbers = []
        // this kinda sucks still
        this.files.forEach(file => {
            if(file.name === item.name.split('(')[0]){
                counter++;
                occupiedNumbers.push(item.name.split('(')[1][0])
            }
        });
        if(counter > 0 && !occupiedNumbers.includes(counter)) {item.name = item.name + "(" + counter + ")"}
        else {
            while(occupiedNumbers.includes(counter)) counter++;
            item.name = item.name + "(" + counter + ")"
        }
        this.files.push(item);
    }

    RemoveItem(item){
        this.files.pop(item);
    }

    Delete(){
        if(this.parent != null){
            this.parent.files.RemoveItem(this);
        }
    }

    Rename(name){
        this.folderName = name;
    }

    Copy(targetFolder){
        let folder = new Folder(this.fileName, targetFolder)
        folder.files = this.files;
        targetFolder.AddItem(folder);
    }
}


a = "Alma"
b = "Alma(1)"
b = "Copy(6)"
console.log(a === b.split('(')[0])
console.log(b.split('(')[1][0]);