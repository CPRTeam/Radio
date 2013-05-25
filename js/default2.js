function fun_def_item(){

	//RDOKNU001 ~ 050
	var count_items = 0;
	
	var header='RDOKNU';
	for(var i=1;i<=50;i++){
		var tmp=''+i;
		if(i<10)tmp='0'+tmp;
		if(i<100)tmp='0'+tmp;
		tmp=header+tmp;
		
		$.storage.set('item_list_'+count_items,tmp);
		$.storage.set('item_name_'+tmp,'無線電');
		$.storage.set('item_borrow_'+tmp,'');
		$.storage.set('item_borrowtime_'+tmp,'');
		$.storage.set('item_returntime_'+tmp,'');
		count_items+=1;
	}
	$.storage.set('item_count',count_items);
	
}
function fun_def_member(){
	var tmpdata='002,STAFF,CCC|020,STAFF,jacksctsai|030,STAFF,darkgerm|057,STAFF,excusemejoe|082,STAFF,danyk|083,STAFF,yungyuc|099,STAFF,政大小Q|115,STAFF,Ch.Andrew|124,STAFF,yenlung|127,STAFF,Zoie|135,STAFF,Ching Yi|153,STAFF,Angelboy|180,STAFF,Buganini|190,STAFF,壯士|192,STAFF,msc0953|225,STAFF,yychen|241,STAFF,daikeren|245,STAFF,whosaysni|250,STAFF,asika|258,STAFF,Drake|277,STAFF,Toomore|286,STAFF,Alarm|291,STAFF,Scott|314,STAFF,Bella|319,STAFF,moogoo|342,STAFF,timtan|350,STAFF,StephanChang|379,STAFF,dokelung|431,STAFF,bluedog0313|456,STAFF,Stone|485,STAFF,lloyd|498,STAFF,小呂|505,STAFF,Sonic|510,STAFF,tcc|010,STAFF,lemonlatte|121,STAFF,Albert|133,STAFF,marr|187,STAFF,Jenny/jsliang|233,STAFF,小海|234,STAFF,keitheis|070,STAFF,weijr|095,STAFF,PeterWolf|900,STAFF,Teri|901,STAFF,徐千洋|902,STAFF,hugo|903,STAFF,samuel|904,STAFF,呂柏頤|905,STAFF,shane|906,STAFF,Eugene|907,STAFF,shiashia|908,STAFF,kanru|909,STAFF,Rex Tsai|910,STAFF,legist (強哥)|912,STAFF,damon|913,STAFF,davihuan|914,STAFF,Tiger|915,STAFF,小耕|916,STAFF,竹本立里|917,STAFF,腹黒い茶|918,STAFF,denny|919,STAFF,莫風';
	var tmparr=tmpdata.split('|');
	var count_member=0;
	$.each(tmparr,function(v,d){
		var data=d.split(',');
		
		$.storage.set('member_list_'+count_member,data[0]);
		$.storage.set('member_name_'+data[0],data[2]);
		$.storage.set('member_group_'+data[0],data[1]);
		
		count_member+=1;
	});
	$.storage.set('member_count',count_member);
}