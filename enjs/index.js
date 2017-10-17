$().ready(function(){
	//当前播放器状态
	var playStatus = {
		currentTrackLen: playlist.result.tracks.length,
		currentTrackIndex: 0,
		currentTime: 0,
		currentTotalTime: 0,
		playStatus: true,
	};

	//播放器控制方法
	var playerControls = {
		//歌曲基本信息
		trackInfo: function(args){
			var obj = playlist.result.tracks[playStatus.currentTrackIndex];
			
			args = args || {
				name:obj.name,
				artist:obj.artists[0].name,
				album:obj.album.name,
				albumPic:obj.album.picUrl + '?param=270y270',
				total:obj.duration,
				src: obj.mp3Url,
			};

			$('.player .trackInfo .name').text(args.name);
			$('.player .trackInfo .artist').text(args.artist);
			$('.player .trackInfo .album').text(args.album);	
			$('.player .albumPic').css('background','url(' + args.albumPic + ')');			
			$('.player .time .total').text(timeConvert(args.total / 1000));
			playStatus.currentTotalTime = Math.floor(args.total / 1000);
			$('#audio source').attr('src',args.src);
		},

		//播放、暂停状态处理
		playStatus: function(){
			$('.player .controls .play i').attr('class', 'icon-' + (playStatus.playStatus?'pause':'play'));

			if(playStatus.playStatus){
				$('#audio')[0].play();
			}else{
				$('#audio')[0].pause();
			}
		},

		//当前时间和进度处理
		playTime: function(){
			$('.player .time .current').text(timeConvert(playStatus.currentTime));
			$('.player .progress').css('width', playStatus.currentTime / playStatus.currentTotalTime * 100 + '%');
		}

	};

	var timeConvert = function(timestamp){
	    var minutes = Math.floor(timestamp / 60);
	    var seconds = Math.floor(timestamp - (minutes * 60));

	    if(seconds < 10) {
	      seconds = '0' + seconds;
	    }

	    timestamp = minutes + ':' + seconds;
	    return timestamp;
	};

	var init = function(){
		playerControls.trackInfo();		
		playerControls.playStatus();

		$('.player .controls .play').click(function(){
			playStatus.playStatus = !playStatus.playStatus;	
			playerControls.playStatus();
		});

		$('.player .controls .previous').click(function(){
			if(playStatus.currentTrackIndex - 1 < 0){
				alert('已经没有上一首了');
			}else{
				playStatus.currentTrackIndex --;
			}

			$('#audio').remove();
			$('.player').append('<audio id="audio"><source src=""></audio>');			
			playerControls.trackInfo();
			playerControls.playStatus();
		});

		$('.player .controls .next').click(function(){
			if(playStatus.currentTrackIndex + 1 >= playStatus.currentTrackLen){
				alert('已经没有下一首了');
			}else{
				playStatus.currentTrackIndex ++;
			}

			//换src的方法没法切换声音，试了好几种方法都不行，只能删了再重建了
			$('#audio').remove();
			$('.player').append('<audio id="audio"><source src="css/吻别.mp3"></audio>');			
			playerControls.trackInfo();
			playerControls.playStatus();
		});

		setInterval(function(){
			playStatus.currentTime = $('#audio')[0].currentTime;			
			playerControls.playTime();

			if(playStatus.currentTime >= playStatus.currentTotalTime){
				$('.player .controls .next').click();
			}
		}, 300);
	};

	init();

});