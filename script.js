var x=[];
var nval;
var Q1=0;
var Q3=0;
function showF(){
 const num=document.getElementById("numberOfFields");
 console.log(num.value);
 nval=num.value;
 var str='<h1>claas range:Freequency(Fi)</h1>';
 for(var i=0;i<num.value;i++){
     var inputf1=' <input type="text" name="" id="x'+i+'" >';
     var inputf2=' <input type="text" name="" id="f'+i+'" >';
     str+=inputf1+inputf2+"<br>";
 }
 str+="<button id='generate' onclick='generate()'>Generate</button>";
 document.getElementById("inputf").innerHTML=str;
}

function Row(xi,fi){
    this.fi=fi/1;
this.xi=xi;
 this.xarr = xi.split("-");
 this.x1=this.xarr[0]/1;
 this.x2=this.xarr[1]/1;
 this.dif=this.x2-this.x1;
 this.xmid=(this.x1+this.x2)/2;
 this.xifi=this.xmid*this.fi;
 this.xmid2=this.xmid*this.xmid;
 this.xmid2fi=this.xmid2*this.fi;

 this.cmfi=0;





}


function generate () {
   
    for(var i=0;i<nval;i++){
        var xi= document.getElementById("x"+i).value; 
        var fi= document.getElementById("f"+i).value; 
       
        x.push(new Row(xi, fi));
    }
   printtable();
  
}




function printtable(){
    var cf=0;
    var str='<table class="table table-dark table-striped">><tr><th>Range</th><th>Xi</th><th>Fi</th><th>C.F</th><th>xifi</th><th>Xi2</th><th>xi2fi</th></tr>';
    for(var i=0;i<nval;i++){
        cf+=x[i]["fi"];
        x[i]["cmfi"]=cf;
        str+="<tr>";
        str+="<td>";
        str+=x[i]["xi"];
        str+="</td>";
        str+="<td>";
        str+=x[i]["xmid"];
        str+="</td>";
        str+="<td>";
        str+=x[i]["fi"];
        str+="</td>";
        str+="<td>";
        str+=cf;
        str+="</td>";
        str+="<td>";
        str+=x[i]["xifi"];
        str+="</td>";
        str+="<td>";
        str+=x[i]["xmid2"];
        str+="</td>";
        str+="<td>";
        str+=x[i]["xmid2fi"];
        str+="</td>";
        str+="</tr>";
    }
    var sumfi=Sumfi();
    var sumfixi=Sumfixi();
    var sumxi2=Sumxi2();
    var sumxi2fi=Sumxi2fi();
   
    str+="<tr>";
    str+="<td>";
    str+="</td>"
    str+="<td>";
    str+="</td>"
    str+="<td>";
    str+=sumfi;
    str+="</td>"
    str+="<td>";
    str+="</td>"
    str+="<td>";
    str+=sumfixi;
    str+="</td>"
    str+="<td>";
    str+=sumxi2;
    str+="</td>"
    str+="<td>";
    str+=sumxi2fi
    str+="</td>"



    str+="</tr>";

    str+="</table>"
    var mean=Mean(sumfixi,sumfi);
    var mod=Mod(sumfi,2);
    var q1=Mod(sumfi,1);
    var q3=Mod(sumfi,3);
    var vs=Vs(sumxi2fi,sumfixi,sumfi);
    var ss=Math.sqrt(vs);
    var vp=Vp(sumxi2fi,sumfi,mean);
    var sp=Math.sqrt(vp);
    str+="<h3>mean</h3><code>";
    str+=sumfixi+"/"+sumfi;
    str+="="+mean+"</code>";
    str+="<h3>mod</h3>";
    str+=mod;
    str+="<h3>Q1</h3>";
    str+=q1;
    str+="<h3>Q3</h3>";
    str+=q3;
    str+="<h3> IQR :</h3>";
    str+=Q3-Q1;
    str+="<h3> Variance(sample): </h3>";
    str+=vs;
    str+="<h3> Stanard deviation(sample): </h3>";
    str+=ss;
    str+="<h3> Variance(population): </h3>";
    str+=vp;
    str+="<h3> Stanard deviation(populatin): </h3>";
    str+=sp;
    str+="<h3> Cofficient of variant(Sample): </h3>";
    str+=ss/mean;
    str+="<h3> Cofficient of variant(Population): </h3>";
    str+=sp/mean;
    


    document.getElementById("output").innerHTML=str;
drawchart();
    
}
 function drawchart(){
     var val1=x[0]["xmid"]-x[0]['dif'];
     var val2=x[nval-1]["xmid"]+x[nval-1]['dif'];
    var labels=[];
    labels.push(val1);
    var datas=[];
    datas.push(0);
  for(let i=0;i<nval;i++){
      labels.push(x[i]['xmid']);
      datas.push(x[i]["fi"]);
  }
  labels.push(val2);
  datas.push(0);
  
  const data = {
    labels: labels,
    datasets: [{
      type: 'bar',
      label: 'Bar Dataset',
      data: datas,
      borderColor: 'rgb(255, 99, 132)',
      backgroundColor: 'rgba(255, 99, 132, 0.2)'
    }, {
      type: 'line',
      label: 'Line Dataset',
      data: datas,
      fill: false,
      borderColor: 'rgb(54, 162, 235)'
    }]
  };
  const config = {
    type: 'scatter',
    data: data,
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  };
  const mychart=new Chart(document.getElementById("chart"),config);

}

function Vs(fixi2,fixi,N)
{
    var variance=(fixi2*N-(fixi*fixi))/(N*(N-1));
    return variance;

}
function Vp(sumfixi2,N,mean){
    var variance=sumfixi2/N-(mean*mean);
    return variance;

}


function Sumfi(){
    var sum=0;
    for(var i=0;i<nval;i++){
        sum+=x[i]["fi"];
    }
    return(sum)
}
function Sumfixi(){
    var sum=0;
    for(var i=0;i<nval;i++){
        sum+=x[i]["xifi"];
    }
    return(sum)
}
function Sumxi2(){
    var sum=0;
    for(var i=0;i<nval;i++){
        sum+=x[i]["xmid2"];
    }
    return(sum)
}
function Sumxi2fi(){
    var sum=0;
    for(var i=0;i<nval;i++){
        sum+=x[i]["xmid2fi"];
    }
    return(sum)
}
function Mean(sumfixi,sumfi){
return(sumfixi/sumfi);
}
function Mod(sumfi,type){
    var index=0;
    var c=0
    if(type==1){
        var L=sumfi/4
        for(var i=0;i<nval;i++){
        
            if(x[i]["cmfi"]>L){
                
           
                console.log(x[i]["x1"]);
                console.log(x[i]["x2"]);
                index=i;
                
                c=x[i]["x2"]-x[i]["x1"];
                break;
                
            
        }
    
        }
        var L1=x[index]["x1"]
        var Fq3=x[index-1]["cmfi"];
        var fq3=x[index]["fi"];
        var rstr="Mod=L+((N/4-Fq1)/fq1))*c<br>";
        rstr+="="+L1+"(("+L+"-"+Fq3+")/"+fq3+"))*"+c
        var tot=L1+((L-Fq3)/fq3)*c;

        Q1=tot;


    }

    else if(type==2){
        var L=sumfi/2;
        for(var i=0;i<nval;i++){
        
            if(x[i]["cmfi"]>L){
                
           
                console.log(x[i]["x1"]);
                console.log(x[i]["x2"]);
                index=i;
                
                c=x[i]["x2"]-x[i]["x1"];
                break;
                
            
        }
    
        }
        var L1=x[index]["x1"]
       var clv=x[index]["fi"];
      
        var uclval=x[index+1]["fi"];
        var lclval=x[index-1]["fi"];
        var delta1=clv-lclval;
        var delta2=clv-uclval;
        var tot=L1+(delta1/(delta1+delta2))*c;
        var rstr="Mod=L+(delta1/(delta1+delta2))*c<br>";
        rstr+="="+L1+"+"+"("+delta1+"/("+delta1+"+"+delta2+"))"+"*"+c+"<br>";
    }
    else{
        var L=(sumfi/4)*3;
       
        for(var i=0;i<nval;i++){
        
            if(x[i]["cmfi"]>L){
                
           
                console.log(x[i]["x1"]);
                console.log(x[i]["x2"]);
                index=i;
                
                c=x[i]["x2"]-x[i]["x1"];
                break;
                
            
        }
    
        }
        var L1=x[index]["x1"]
        var Fq3=x[index-1]["cmfi"];
        var fq3=x[index]["fi"];
        var rstr="Mod=L+((N/4-Fq3)/fq3))*c<br>";
        rstr+="="+L1+"(("+L+"-"+Fq3+")/"+fq3+"))*"+c
        var tot=L1+((L-Fq3)/fq3)*c;
        Q3=tot;
    }

    
  

    rstr+="="+tot;
    
    return rstr;


    
}