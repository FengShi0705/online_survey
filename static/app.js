d3.select('input#Explore').on('keydown',function(){
    if (d3.event.keyCode==13){
        var input_word=d3.select('input#Explore').node().value;
        Explore(input_word);
    };
});

function Explore(word){
    console.log(word);
};