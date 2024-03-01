let player_boxes = document.body.querySelectorAll(".image_player");
let computer_boxes = document.body.querySelectorAll(".image_computer");
let box_border_prop = ["1vmin solid #9290C3", "1vmin solid black"];
let player_score_text = document.body.querySelector(".player_score h1");
let computer_score_text = document.body.querySelector(".computer_score h1");
let reset_button = document.body.querySelector(".reset");

let border_player_state = 0;
let player_box, computer_box;
let player_score = 0;
let computer_score = 0;

player_boxes.forEach((tool) => {
  tool.addEventListener("mouseenter", () => {
    if (border_player_state == 0) {
      tool.style.border = box_border_prop[0];
    }
  });
});
player_boxes.forEach((tool) => {
  tool.addEventListener("mouseleave", () => {
    if (border_player_state == 0) {
      tool.style.border = box_border_prop[1];
    }
  });
});

function remove_other_boxes(computer_box, player_box) {
  computer_boxes.forEach((tool) => {
    if (tool != computer_box) {
      tool.style.animation = "opacity_decrease ease-in-out 1s forwards";
    }
  });
  player_boxes.forEach((tool) => {
    if (tool != player_box) {
      tool.style.animation = "opacity_decrease  ease-in-out 1s forwards";
    }
  });
}
function check_for_winner() {
  let winner;
  if (border_player_state == 0) {
    let player_rps = player_box.getAttribute("tool");
    let computer_rps = computer_box.getAttribute("tool");
    if (player_rps == computer_rps) {
      winner = "draw";
    } else if (player_rps == 0 && computer_rps == 2) {
      winner = "player";
    } else if (player_rps == 2 && computer_rps == 0) {
      winner = "computer";
    } else if (player_rps > computer_rps) {
      winner = "player";
    } else {
      winner = "computer";
    }
    if (winner == "computer") {
      computer_score += 1;
      computer_score_text.innerText = computer_score;
    } else if (winner == "player") {
      player_score += 1;
      player_score_text.innerText = player_score;
    }
    return winner;
  }
  return 0;
}
player_boxes.forEach((tool) => {
  tool.addEventListener("click", () => {
    player_box = tool;
    tool.style.border = box_border_prop[border_player_state];
    computer_box = computer_boxes[Math.floor(Math.random() * 3)];
    computer_box.style.border = box_border_prop[0];
    remove_other_boxes(computer_box, tool);
    winner = check_for_winner();
    border_player_state = 1;
  });
});
function show_all_boxes() {
  player_box.style.borderColor = "black";
  computer_box.style.borderColor = "black";
  player_boxes.forEach((box) => {
    if (box != player_box) {
      box.style.animation = "opacity_increase ease-in-out 1s";
    }
  });
  computer_boxes.forEach((box)=>{
    if(box!=computer_box){
      box.style.animation = "opacity_increase ease-in-out 1s"
    }
  })
}
reset_button.addEventListener("click", () => {
  border_player_state = 0;
  show_all_boxes();
});
