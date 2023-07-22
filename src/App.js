import './App.css';

const GetCode = () => document.getElementById("code").value;

function CompileAndDownload() {
  const code = GetCode();
  console.log("Found code: " + code); 
  var currentCodeString = null;
  var currentStatement = [];
  var inString = false;
  var esapcing = false;
  var inParams = false;

  code.forEach(char => {
    if (char == "'" && !esapcing){
      inString = !inString
    }
    if (char == "#" && !esapcing){
      esapcing = true;
    }

    if (char = "(" && !inString){
      inParams = true;
    }

    if (char = ")" && !inString){
      inParams = false;
    }

    if (char == " " || char == "(" || char == "=" || char == ";" && !inString){
      switch (currentCodeString) {
        //case "if":
        //    
        //  break;
      
        case "Output":            
        default:
          break;
      }
    }
  });
}

function SaveToFile() {
  const link = document.createElement("a");
  const code = GetCode();
  const fileName = document.getElementById("fileName").value;
  const file = new Blob([code], { type: 'text/plain' });
  link.href = URL.createObjectURL(file);
  link.download = fileName;
  link.click();
  URL.revokeObjectURL(link.href);
}

function OpenFile(){
  let input = document.createElement('input');
  input.type = 'file';
  input.onchange = _ => {
    // you can use this method to get file and perform respective operations
            let files =   Array.from(input.files);
            console.log(files);
            var fr= new FileReader();
            fr.onload = function(){
                document.getElementById('code')
                        .value=fr.result;
            }
              
            fr.readAsText(files[0]);
        };
  input.click();
  
}

function App() {
  return (
    <div className="container">
      <label>GaryLang Code</label>
      <textarea id="code"></textarea>
      <input type="text" id="fileName" placeholder="File name to save"></input>
      <button onClick={(e) => OpenFile()}>Open File</button>
      <button onClick={(e) => CompileAndDownload()}>Compile</button>
      <button onClick={(e) => SaveToFile()}>Save File</button>
    </div>
  );
}

export default App;
