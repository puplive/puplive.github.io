// JavaScript Document
// $(function(){
	
	var $td = $('#tab table td');		//内层 td	
	var $index=0;                       //记录鼠标点击的位置
	var $a , $b , $c , $d , $e , $f , $aa , $bb , $cc , $dd , $ee , $ff  ;	
	var $last_number='';	
	var $number='';
	var $number_1='';
	var $boole=true;
	
	$('#btn input').click(function(){
		if($(this).val()=='C'){
			$number='';
		}
		else if($(this).val()=='重置'){
			$td.text('').removeClass('wrong td_style');
		}
		else if($(this).val()=='标记'){			
			$number=$number_1;
			if($boole){
				$boole=false;
				$(this).css('color','#00F')
			}else{
				$boole=true;
				$(this).css('color','#000')	
			 };
		}		
		else{
			$number=$(this).val();
			$number_1=$number;
		};
		$(this).addClass('input_style').siblings().removeClass('input_style')		
	}); 
	
	
	//键盘输入数字
	$(window).keydown(function(e){			   
		if(e.keyCode>=49&&e.keyCode<=57) {
			$last_number = $td.eq($index).text(); //记录之前的数字
			$td.eq($index).text(e.keyCode-48); 
			$number=e.keyCode-48;
			criteria_x();	
		};
		
	});

	//格子添加事件
	$td.each(function(index, element) { 		 	      
		$(this).bind('click',function(){
			$index=index;					//记录点击位置
			$last_number = $td.eq($index).text(); //记录之前的数字				
			//判断新数字和原数字是否相等，相等就清空，不等就覆盖
			if( $last_number == $number ){
				$td.eq(index).text('');
			}else{
				$td.eq(index).text($number);		 //添加新数字
			};												 
			criteria_x();	
		});		
	});
	
	
	//每次 更改数字时的判断
	function criteria_x(){
		$td.removeClass('td_style');		 //删除样式
		var arr_n = [];						 			
		//计算位置
		position($index);
		console.log('第'+$index+'个 在第 '+$b+' 个tr里第 '+$c+' 个table里第 '+$e+' 个tr里第 '+$f+' 个td上');
		for (i = 0 ; i < $td.length; i++) {			
			position_1(i);												  			  
			if ($b == $bb && $e==$ee) {   		//判断一行 
				$td.eq(i).addClass('td_style');	
			}
			if($c==$cc && $f==$ff){				//判断一列 
				$td.eq(i).addClass('td_style');					
			}
			if($b == $bb && $c==$cc){			//判断一组
				$td.eq(i).addClass('td_style');
			}
			if( $td.eq(i).text() == $td.eq($index).text()){
				arr_n.push(i);
			};												
		};		
		setTimeout(function(){$td.removeClass('td_style')}, 200);
		//arr_add( arr_n , $number );	
		criteria_0(arr_n);			
		criteria_1(arr_n);
				
		if($last_number != ''){
			var arr_n = [];
			arr_add( arr_n , $last_number );		
			criteria_0(arr_n);
			criteria_1(arr_n);
		};		
	};
	
	
	
	//计算位置
	function position(x){
		$a = parseInt(x/9);          //内层table=外层td
		$b = parseInt($a/3);             //外层tr
		$c = $a%3;                       //外层tr的第几个table			
		$d = x%9;                    //内层table的第几个td			
		$e = parseInt($d/3);             //内层tr			
		$f = $d%3;                       //内层tr的第几个td	
	};
	
	function position_1(x){
		$aa = parseInt(x/9);          
		$bb = parseInt($aa/3);             
		$cc = $aa%3;                       		
		$dd = x%9;                    			
		$ee = parseInt($dd/3);             
		$ff = $dd%3;                       
	};
	
	//数字相同的下标放在一个数组里
	function arr_add(arr,num){			
		for (i = 0 ; i < $td.length; i++){					
			if( $td.eq(i).text() == num){
				arr.push(i);
			};					
		};
	};
	
	//归类
	function group(arr){
		if($td.eq(i).text()!=''){				
			arr.push(i)
		}
	};			
	
	//判断标准 criteria 
	function criteria(arr){ 	
		for(i=0;i<arr.length;i++){			
			for(j=arr.length;j>i;j--){				
				if($td.eq(arr[i]).text() == $td.eq(arr[j]).text()){					
					$td.eq(arr[i]).addClass('wrong');
					$td.eq(arr[j]).addClass('wrong');
					//continue;
				}					
			} 		   
		}
	};
	
	//重置背景；
	function criteria_0(arr){ 	
		for(i=0;i<arr.length;i++){					
			$td.eq(arr[i]).removeClass('wrong');			   
		};
	};
	//判断相同数字是否在 同一行 同一列 或 同一组里；
	function criteria_1(arr){	
		for(j=0;j<arr.length;j++){
			position(arr[j]);						
			for (i = arr.length ; i > j; i--) {			
				position_1(arr[i]);												     
				if (($b == $bb && $e==$ee) || ($c==$cc && $f==$ff) || ($b == $bb && $c==$cc)) {						
					$td.eq(arr[i]).addClass('wrong');
					$td.eq(arr[j]).addClass('wrong');
				};								 
			};
		};	
	};
	
	
	
// });	










	/*  //
	
	var $tb = $('#tab table');          //内层table
	var $tr_1 = $('#tab > tr')	;		//外层 tr
	var $tr = $('#tab table > tr');		//内层 tr
	var $td_1 = $('#tab > tr > td')	;	//外层 td
	
	for (i = 0 ; i < $td.length; i++) {			
		position_1(i);												  
		//判断一行   
		if ($b == $bb && $e==$ee) {
			$td.eq(i).addClass('td_style');	
			group(arr_x)
		}
		//判断一列 
		if($c==$cc && $f==$ff){
			$td.eq(i).addClass('td_style');					
			group(arr_y)
		}
		//判断一组
		if($b == $bb && $c==$cc){
			$td.eq(i).addClass('td_style');
			group(arr_z)
		}										
	};		
			
	
	
	*/	
	
	
	

