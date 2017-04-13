
function Explore(panelid,minhops){

    Freeze();

    if (panelid=='#outerpanel'){
    var word=d3.select('input#Explore').node().value;
    var page=1;
    };
    if(panelid=='#outerpanel1'){
    var word = Explore_Word;
    var page=2;
    };


    d3.json('/searchtexttowid/'+JSON.stringify(word), function(error,data){

        if(data){
            fresh_page(page);
            Explore_Word=word;

            var wid=data;
            var N = 10;

            //add rows
            for (var i = 1; i < N+1; i++) {
                d3.select(panelid+' tbody').append('tr').attr('class','results').append('td').text(i);
            };
            //add algorithms
            if (panelid=='#outerpanel1'){
                var tp = TP_explore.slice(0,6)
                add_algorithms(null, panelid, minhops, wid, tp, N, 0);
            }else{
                // change intro text of page2
                d3.select('span#query_exercise2').text(Explore_Word);
                d3.json('/get_wiki/'+JSON.stringify(word), function(error,data){
                    console.log(data);
                    if(data==null){
                        var tp = TP_explore.slice(0,6);
                        layout_page1(6);
                        add_algorithms(data, panelid, minhops, wid,tp,N,0);
                    }else{
                        var tp = TP_explore.slice();
                        layout_page1(7);
                        add_algorithms(data, panelid, minhops, wid,tp,N,0);
                    };

                });



            };

        }else{
            alert('Can not match your input concepts');
            Unfreeze();
        };


    });
};

function find_path(){

    Freeze();

    var word1 = d3.select('input#path1').node().value;
    var word2 = d3.select('input#path2').node().value;


    d3.json('/searchtexttowid/'+JSON.stringify(word1), function(error,data){
        if(data){
            var wid1=data;
            d3.json('/searchtexttowid/'+JSON.stringify(word2), function(error,data){
                if(data){
                    fresh_page(3);
                    Pathstart=word1;
                    Pathend=word2;

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


function add_algorithms(wiki, panelid, minhops, wid,tp,N,i){
    if( i <= tp.length-1 ){

        if(tp[i]=='wiki'){

            var explore_rows = d3.select(panelid).selectAll('tr.results').data(wiki)
                                                                         .append('td')
                                                                         .attr('class','alg');

            explore_rows.append('span').style('font-weight','bold').text(function(d){return ExploreOriginalword;});
            explore_rows.append('span').text(function(d){return ' --> '+d;});

            add_algorithms(wiki, panelid, minhops,wid,tp,N,i+1);

        }else{

            var info={'tp': tp[i] ,'wid':wid, 'N':N, 'minhops':minhops};
            d3.json('/survey_explore/'+JSON.stringify(info), function(error,data){
                ExploreOriginalword=data[0][0];

                var explore_rows = d3.select(panelid).selectAll('tr.results').data(data)
                                                                                   .append('td')
                                                                                   .attr('class','alg');

                explore_rows.append('span').style('font-weight','bold').text(function(d){return d[0];});
                explore_rows.append('span').text(function(d){return d[1];});

                add_algorithms(wiki, panelid, minhops,wid,tp,N,i+1);
            });

        };



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
    d3.select('div#submit').on('click',function(){
        Submit_userRating();
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


function showpage(n){
    var pages=[1,2,3];
    var i=pages.indexOf(n);
    pages.splice(i, 1);
    d3.select('#page'+n).style('display','block');
    d3.select('#page'+pages[0]).style('display','none');
    d3.select('#page'+pages[1]).style('display','none');
    window.scrollTo(0, 0);

};

function fresh_page(n){
    $('div#page' + n + ' select.selectbar').barrating('clear');
    d3.selectAll('div#page' + n + ' tr.results').remove();
};




function Submit_userRating(){
    // user rating
    var Q={};
    for (var i = 1; i < 4; i++) {
        Q[i]={};
        for (var j = 1; j < 4; j++){
            Q[i][j]={};
            var qid='#Q'+i+'-'+j+' select.selectbar';
            d3.selectAll(qid).each(function(d,g){

                if( d3.select(this).node().value=='' ){
                    alert('The group ' + ItoLetter[g] + ' in question '+ i +'.'+ j +' is not rated yet, Please complete it to finish this survey.')
                    showpage(i);
                    $('#Q'+i+'-'+j)[0].scrollIntoView( true );
                    throw new Error('Not complete');
                }else{
                    //Q[i][j].push(  );
                    Q[i][j][TP_explore[g]]=parseInt(d3.select(this).node().value);
                };

            });
        };
    };
    // user query
    var info={'Explore':Explore_Word, 'pathstart':Pathstart, 'pathend':Pathend, 'userRating':Q};
    d3.json('/user_rating/'+JSON.stringify(info), function(error,data){
        if (data=='OK'){
            d3.select('#page3').style('display','none');
            d3.select('body').append('h3').text('Thank you! Your answer has been recorded')
        }else{
        alert ('Error occurs during submitting, Please submit again.')
        };
    });

}


function layout_page1(n){
    if(n==6){
        var textQ="six groups of results (A, B, C, D, E and F)";
    };

    if(n==7){
        var textQ="seven groups of results (A, B, C, D, E, F and G)";
    };

    // question head
    d3.select('#page1 div.Questions').select('#Q1-1').select('span#changheadQ').text(textQ);

    // layout header
    var headers = ['A','B','C','D','E','F','G','H']
    d3.select('#outerpanel tbody').selectAll('th.alg').remove();
    for (var i = 0; i < n; i++) {
        d3.select('#outerpanel tbody').select('tr').append('th').attr('class','alg').text(headers[i]);
    };

    // adjust size
    var width = 300*n+60;
    d3.selectAll('#outerpanel table, #wrapperdiv').style('width',width+'px');

    // layout rating
    var values=['','1','2','3','4','5','6','7','8','9','10']
    d3.select('#page1 div.Questions').selectAll('div.bar,br').remove();
    for (var i =1; i<4; i++){
        var bars=d3.select('#page1 div.Questions').select('#Q1-'+i).selectAll('div.bar').data(headers.slice(0,n))
                                                                         .enter()
                                                                         .append('div')
                                                                         .attr('class','bar')
                                                                         .text(function(d){
                                                                            return d;
                                                                         });

        bars.append('select').attr('class','selectbar').each(function(d){
            d3.select(this).selectAll('option').data(values).enter().append('option').attr('value',function(d){
                return d;
            }).text(function(d){return d;});
        });
        d3.select('#page1 div.Questions').select('#Q1-'+i).append('br').style('clear','left');
    };

    $(function() {
      $('.selectbar').barrating({
        theme: 'bars-1to10'
      });
   });


};