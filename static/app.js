
function Explore(panelid,minhops){
    //remove original row
    d3.selectAll(panelid + ' tr.results').remove();
    Freeze();

    if (panelid=='#outerpanel'){
    var word=d3.select('input#Explore').node().value;
    Explore_Word=word;
    };
    if(panelid=='#outerpanel1'){
    var word = Explore_Word;
    };

    console.log(word);
    console.log(panelid);
    d3.json('/searchtexttowid/'+JSON.stringify(word), function(error,data){

        if(data){
            var wid=data;
            var tp = TP_explore.slice()
            var N = 10;

            //add rows
            for (var i = 1; i < N+1; i++) {
                d3.select(panelid+' tbody').append('tr').attr('class','results').append('td').text(i);
            };
            //add algorithms
            add_algorithms(panelid, minhops, wid,tp,N,0);
        }else{
            alert('Can not match your input concepts');
            Unfreeze();
        };


    });
};

function find_path(){
    //remove original row;
    d3.selectAll('#outerpanel2 tr.results').remove();
    Freeze();

    var word1 = d3.select('input#path1').node().value;
    var word2 = d3.select('input#path2').node().value;

    console.log(word1,word2);
    d3.json('/searchtexttowid/'+JSON.stringify(word1), function(error,data){
        if(data){
            var wid1=data;
            d3.json('/searchtexttowid/'+JSON.stringify(word2), function(error,data){
                if(data){
                    var wid2=data;
                    var tp = TP_path.slice()
                    var N=5;
                    //add rows
                    for (var i = 1; i < N+1; i++) {
                        d3.select('#outerpanel2 tbody').append('tr').attr('class','results').append('td').text(i);
                    };

                    //add pathsalgorithms
                    paths_algorithms(wid1,wid2,tp,N,0);
                }else{
                    alert('Can not find your second input');
                    Unfreeze();
                };

            });

        }else{
            alert('Can not find your first input');
            Unfreeze();
        };

    });

};


function paths_algorithms(wid1,wid2,tp,N,i){
    if( i <= tp.length-1 ){
        var info={'tp': tp[i], 'start':wid1, 'end':wid2, 'N':N};
        d3.json('/survey_path/'+JSON.stringify(info), function(error,data){
            console.log(data);
            var pathrows=d3.select('#outerpanel2').selectAll('tr.results').data(data)
                                                                         .append('td')
                                                                         .attr('class','alg');

            pathrows.append('span').style('font-weight','bold').text(function(d){return d[0];});
            pathrows.append('span').text(function(d){return d[1];});
            pathrows.append('span').style('font-weight','bold').text(function(d){return d[2];});

            paths_algorithms(wid1,wid2,tp,N,i+1)
        });

    }else{
        Unfreeze();
    };

};


function add_algorithms(panelid, minhops, wid,tp,N,i){
    if( i <= tp.length-1 ){
        var info={'tp': tp[i] ,'wid':wid, 'N':N, 'minhops':minhops};

        d3.json('/survey_explore/'+JSON.stringify(info), function(error,data){
            console.log(data);
            var explore_rows = d3.select(panelid).selectAll('tr.results').data(data)
                                                                               .append('td')
                                                                               .attr('class','alg');

            explore_rows.append('span').style('font-weight','bold').text(function(d){return d[0];});
            explore_rows.append('span').text(function(d){return d[1];});

            add_algorithms(panelid, minhops,wid,tp,N,i+1);
        });
    }else{
        Unfreeze();
    };

};


function Freeze(){
    Loading_Spinner.spin(d3.select('#spin').node());
    d3.select('div#explore_go').on('click', null);
    d3.select('div#explore_go1').on('click', null);
    d3.select('div#path_go').on('click', null);
    d3.select('input#Explore').on("keydown", null);
    d3.select('input#path1').on("keydown", null);
    d3.select('input#path2').on("keydown", null);
};

function Unfreeze(){
    Loading_Spinner.stop();
    d3.select('div#explore_go').on('click',function(){
        Explore('#outerpanel',1);
    });
    d3.select('div#explore_go1').on('click',function(){
        Explore('#outerpanel1',2);
    });
    d3.select('div#path_go').on('click',function(){
        find_path();
    });

    d3.select('input#Explore').on("keydown", function(){
        if (d3.event.keyCode==13){
            Explore('#outerpanel',1);
        };
    });
    d3.select('input#path1').on("keydown", function(){
        if (d3.event.keyCode==13){
            find_path();
        };
    });
    d3.select('input#path2').on("keydown", function(){
        if (d3.event.keyCode==13){
            find_path();
        };
    });
};


function NextPage(){
 if (d3.select('.page').style('display')=='block'){
    d3.select('.page').style('display','none')
    d3.select('.page1').style('display','block')
 }else if(d3.select('.page1').style('display')=='block'){
    d3.select('.page1').style('display','none')
    d3.select('.page2').style('display','block')
 }else{
    d3.select('.page2').style('display','none')
    d3.select('.page').style('display','block')
 };


}