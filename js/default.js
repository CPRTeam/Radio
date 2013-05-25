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
	var tmpdata='001,行銷組-組長,Caesar Chi|002,行銷組-設計師,Roca|003,紀錄組(文字),Dieter|004,紀錄組(文字),卡賓|005,紀錄組(文字),Carl|006,紀錄組(文字),陳柏穎|007,紀錄組(攝影),Anna Su|008,紀錄組(攝影),雨夜|009,紀錄組(攝影),Lion|010,紀錄組(攝影),丞相|011,紀錄組-組長,藍星|012,核心成員,Felix Chen|013,核心成員,Sean Liu|014,財務組-組長,Steven Su|015,報到組,曉晰|016,報到組,Kittyko|017,報到組,Sammy|018,報到組,王韻綺|019,報到組,Beata Lin|020,報到組,亞亞|021,報到組-組長,Ryan|022,場務組,Kevin-WY|023,場務組,Loye|024,場務組,John Hiroki|025,場務組,Angelboy|026,場務組,JiaHong|027,場務組,末飲|028,場務組,豆豆|029,場務組,章安德魯|030,場務組,善淳|031,場務組,Win Wu|032,場務組,Elvis|033,場務組,阿昇|034,場務組,熊貓|035,場務組,Xia|036,場務組,下午|037,場務組,晨帆|038,場務組,聽風|039,場務組,Vagabond|040,場務組長,三秒|041,線路組,莫風|042,線路組,Denny|043,線路組,Tiger|044,線路組,小耕|045,線路組,竹本立里|046,線路組,腹黒い茶|047,線路組,Star|048,線路組,Infax|049,線路組-組長,David|050,餐點組,極地狐|051,餐點組,JumpJumpLight|052,贊助組,Trista|053,贊助組-組長,Richard (legist 強)|054,議程組(主持),Snake|055,議程組(主持),Yiching|056,議程組(主持),茶米|057,議程組(場控),ABen|058,議程組(場控),SkyArrow|059,議程組(場控),元兒～|060,議程組(場控),小莊|061,議程組-組長,TonyQ|062,顧問-不分組,高見龍|063,顧問-紀錄組,Sc0tt';
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