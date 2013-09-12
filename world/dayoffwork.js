command("callboss", "make a phone call", function(rest,player,game){
  player.write("Hello?");
  player.write("Your trying to get a day off work. What symptom do you choose: A.Bunged up nose B.Sore Throat C.Scream in agony");
};
command("a", function(rest,player,game){
  Player.write("Boss doesn't want you sneazing and sniffing in the office. How do you respond? A. I dont think i can come in today. B.The thought of working has made me sick.")
};
