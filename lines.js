var W = window.innerWidth, H = window.innerHeight;
var start_time = new Date();
var last_timestamp;
var last_update_time = start_time;
var canvas;
var ctx;

window.onload = function(){
    canvas = document.getElementById('c');
    let d = document.getElementById('display');
    let t = document.getElementById('title');
    canvas.setAttribute("width", d.getBoundingClientRect().width);
    canvas.setAttribute("height", d.getBoundingClientRect().height - t.getBoundingClientRect().height);
    ctx = canvas.getContext("2d");

    W = canvas.getBoundingClientRect().width;
    H = canvas.getBoundingClientRect().height;

	window.addEventListener('resize', function(){
		W = canvas.getBoundingClientRect().width;
		H = canvas.getBoundingClientRect().height;
        console.log('resize');
	});

	window.requestAnimationFrame(update_screen);
}


function randn_bm() {
    var u = 0, v = 0;
    while(u === 0) u = Math.random(); //Converting [0,1) to (0,1)
    while(v === 0) v = Math.random();
    return Math.sqrt( -2.0 * Math.log( u ) ) * Math.cos( 2.0 * Math.PI * v );
}

function get_endpoint(light_direction){
    let mu = Math.PI;
    let sigma = Math.PI/4;
    let normal_angle = mu + sigma * randn_bm()
    if (normal_angle > Math.PI*2){
        return get_endpoint(light_direction);
    }
    return (light_direction + normal_angle) % (Math.PI*2)
}
function update_screen(timestamp){
    let circle_margin = 5;
    let radius = Math.min(W/2, H/2) - circle_margin;
    let light_direction = 1.75 * Math.PI;
    for(let i = 0; i < 10; i++){
        let point_angle_1 = get_endpoint(light_direction)
        let x_1 = W/2 + radius * Math.cos(point_angle_1);
        let y_1 = H/2 + radius * Math.sin(point_angle_1);
        let point_angle_2 = get_endpoint(light_direction)
        let x_2 = W/2 + radius * Math.cos(point_angle_2);
        let y_2 = H/2 + radius * Math.sin(point_angle_2);
        //ctx.clearRect(0, 0, W, H);
        ctx.lineWidth = 0.05;
        ctx.strokeStyle = 'rgba(0, 0, 0, 0.2)'
        ctx.beginPath();
        ctx.moveTo(x_1, y_1);
        ctx.lineTo(x_2, y_2);
        ctx.stroke()
        ctx.closePath();
    }
    let do_light = false;
    if(do_light){
        light_direction = (light_direction + Math.PI) % (Math.PI*2);
        for(let i = 0; i < 100; i++){
            let point_angle_1 = get_endpoint(light_direction)
            let x_1 = W/2 + radius * Math.cos(point_angle_1);
            let y_1 = H/2 + radius * Math.sin(point_angle_1);
            let point_angle_2 = get_endpoint(light_direction)
            let x_2 = W/2 + radius * Math.cos(point_angle_2);
            let y_2 = H/2 + radius * Math.sin(point_angle_2);
            //ctx.clearRect(0, 0, W, H);
            ctx.lineWidth = 0.05;
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)'
            ctx.beginPath();
            ctx.moveTo(x_1, y_1);
            ctx.lineTo(x_2, y_2);
            ctx.stroke()
            ctx.closePath();
        }
    }

	window.requestAnimationFrame(update_screen);
}
