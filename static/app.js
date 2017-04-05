
function Explore(word){
    //remove original row
    d3.selectAll('tr.results').remove();
    Freeze();


    console.log(word);
    d3.json('/searchtexttowid/'+JSON.stringify(word), function(error,data){

        if(data){
            var wid=data;
            var tp = ['R_n_HM','R_r_HM','R_n_GM','R_r_GM','R_n_AM','R_r_AM']
            var N = 10;

            //add rows
            for (var i = 1; i < N+1; i++) {
                d3.select('tbody').append('tr').attr('class','results').append('td').text(i);
            };
            //add algorithms
            add_algorithms(wid,tp,N,0);
        }else{
            alert('Can not match your input concepts');
            Unfreeze();
        };


    });
};

function add_algorithms(wid,tp,N,i){
    if( i <= tp.length-1 ){
        var info={'tp': tp[i] ,'wid':wid, 'N':N};

        d3.json('/survey_explore/'+JSON.stringify(info), function(error,data){
            console.log(data);
            d3.selectAll('tr.results').data(data)
                                      .append('td')
                                      .attr('class','alg')
                                      .text(function(d){
                                        return d;
                                      });

            add_algorithms(wid,tp,N,i+1);
        });
    }else{
        Unfreeze();
    };

};


function Freeze(){
    Loading_Spinner.spin(d3.select('#spin').node());
    d3.select('input#Explore').on("keydown", null);
};

function Unfreeze(){
    Loading_Spinner.stop();

    d3.select('input#Explore').on('keydown',function(){
    if (d3.event.keyCode==13){
        var input_word=d3.select('input#Explore').node().value;
        Explore(input_word);
        };
    });
};