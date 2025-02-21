
export class File{
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

export class Folder{
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
        if(this.parent != TotalCommanderManager){
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

export class WindowManager{

    constructor(window, path, dropdown, table, rootDrive){
        this.window = document.getElementById(window);
        this.path = document.getElementById(path);
        this.dropdown = document.getElementById(dropdown);
        this.table = document.getElementById(table);
        this.currentLocation = rootDrive
    }

    LoadRoots(roots){
        roots.forEach(drive => {
            let div = document.createElement('div');
            div.innerHTML = drive.folderName;
            div.classList += "dropdown-item";
            this.dropdown.addChild(div);
        })
    }

    SetCurrentPath(){
        
    }

    NavigateToLocation(){
        
    }
}

export class TotalCommanderManager{
    constructor() {
        this.drives = []
        this.drives.push(new Folder("C", null));
        this.drives.push(new Folder("D", null));

        this.leftPanel = new WindowManager("window-left", "left-path", "dropdown-list-left", "table-left-body", this.drives[0]);
        this.rightPanel = new WindowManager("window-right", "right-path", "dropdown-list-right", "table-right-body", this.drives[0]);

        this.leftPanel.LoadRoots(this.drives);
        this.rightPanel.LoadRoots(this.drives);
    }
}


a = "Alma"
b = "Alma(1)"
b = "Copy(6)"
console.log(a === b.split('(')[0])
console.log(b.split('(')[1][0]);