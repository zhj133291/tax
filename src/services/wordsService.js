define([],function(){
	var words={
		project:"鼓楼国税党建管理系统",
		current:"您当前的位置：",
		home:"首页  >",
		operate:"操作",
		login:"登录",
		num:"验证码：",
		cancel:"取消",
		logout:"退出",
		writeOff:"注销",
		accountNumber:"账  号：",
		passWord:"密  码：",
		loginByAccount:"账号登录",
		loginErrTip:"账号或密码不正确，请重新输入",
		setPwdSuc:"设置密码成功",
		toLogin:"返回登录",
		accoutErr:"账户异常",
		sure:"确认",
		inter:"江苏国税在线约谈平台",
		login:{
			nameErr:"请输入1~20位字母与数字组合",
			pwdErr:"请输入1~20位字母与数字组合",
			numErr:"验证码错误",
			numtimeOut:"验证码过期,请重新生成"
		},
		common:{
			activityMember:"参加机构",
			memberName:"党员名称",
			sureDelete:"该角色下已关联管理员，对应管理员将一同删除，是否确认？",
			basicInfo:"基本信息",
			securityInfo:"安全信息",
			tip:"提示",
			name:"姓名",
			sex:'性别',
			jobNo:'工号',
			phone:"手机号",
			cardId:"身份证号",
			role:"角色性质",
			theMech:"所属机构",
			contactInfo:"联系方式",
			detail:"详情",
			time:"时间",
			place:"地点",
			startTime:"开始时间",
			endTime:"结束时间",
			stopTime:"截止时间",
			activityTime:"活动时间",
			query:"查  询",
			insert:"新 增",
			edit:"编 辑",
			save:"保 存",
			confirm:"确  定",
			cancel:"取  消",
			saveAndRelease:"保存并发布",
			offTheShelf:"下 架",
			exportQRCode:"导出二维码",
			exportExcel:"导  出",
			importExcel:"导  入",
			delete:"删 除",
			batchDelete:"批量删除",
			batchReleased:"批量发布",
			batchOffTheShelf:"批量下架",
			join:"参加",
			haveJoin:"已参加",
			noJoin:"未参加",
			state:'状态',
			nowState:"当前状态",
			operation:"操作",
			operationNo:'操作账号',
			title:'标题',
			sort:'排序',
			downLoad:"下载"
		},
		account:{
			modifyPwd:"密码修改",
			account:"账户设置",
			currentPhone:"当前手机号：",
			loginPwd:"登录密码",
			getCode:"获取验证码",
			loginPwdTip:"安全性高的密码可以使账号更安全，建议您定期更换密码，设置一个包含字母+数字且长度在6-20位的密码。",
			setted:"已设置",
			set:"设置",
			modify:"修改",
			nextStep:"下一步",
			sureSubmit:"确认提交",
			setPwdSuccess:"密码设置成功",
			goLogin:"返回登录",
			loginName:"登录账户",
			role:"角色性质",
			theMech:"所属机构",
			name:"姓名",
			code:"税务人员代码",
			info:"基本信息",
			safe:"安全信息",
			oldErr:"*初始密码错误",
			newErr:"*请输入6-20位数字与字母组合",
			againErr:"*请输入6-20位数字与字母组合",
			againErr_1:"*密码前后不一致",
			old:"请输入原始密码",
			new:"请输入6-20位新密码,含数字+字母组合",
			again:"请再次确认新密码",
			oldPwd:"旧密码:",
			newPwd:"新密码:",
			againPwd:"确认密码:",
			commit:"提交"
		},
		modifyPwd:{
			oldPwd:"请输入当前密码",
			pleaseEnterYourSetPassword:"请设置6-20位密码，数字+字母组合",
			pleaseEnterYourNewPassword:"请确认新密码",
		},
		infoMaint:{
			export:"党员Excel导入",
			infoMaint:"党员信息维护",
			name:"党员名称：",
			sex:"性别",
			jobNumber:"工号：",
			identifyID:"身份证号：",
			mobile:"手机号:",
			mail:"邮箱：",
			pwd:"初始密码：",
			status:"账号冻结：",
			reset:"重置密码",
			theMech:"所属支部：",
			detail:"党员信息详情",
			viliName:"*请输入有效的用户名",
			viliPwd:"*请输入有效的密码",
			viliIdentifyID:"*请输入有效的身份证号",
			viliPhone:"*请输入有效的手机号",
			viliMail:"*请输入正确的邮箱地址",
			userInfo:"税务人员详情",
			addUser:"新增人员",
			deleteUser:"删除人员",
			sureDelete:"确认删除",
			userName:"人员名称",
			enterNamePlz:"请输入人员名称",
			enterCodePlz:"请输入税务人员代码",
			enterLoginNamePlz:"请输入登录账号",
			enterPwdPlz:"请输入不超过20位的初始密码",
			code:"税务人员代码",
			loginName:"登录账户",
			pwd:"初始密码",
			resetPwd:"重置密码",
			freez:"账号冻结",
			roleCode:"关联角色",
			nameLimit:"请输入2到50位字符",
			taxCodeLimit:"最长11位数字",
			loginNameLimit:"最长8位,含数字字母",
			pwdLimit:"请输入不超过20位的初始密码",
			nameLengthLimit:"*请输入2到50位字符",
			codeLengthLimit:"*请输入1到11位数字",
			loginNameLengthLimit:"*请输入8位以内字母或数字",
			loginPwdLengthLimit:"*请输入不超过20位的初始密码"
		},
		organization:{
			importOrg:"机构Excel导入",
			importTax:"人员Excel导入",
			importTip:"表格中部分机构或人员超出了您当前账号的数据操作权限，只能导入当前账号有操作权限的部分机构或人员，是否继续？",
			orgCodeErr:"请输入11位组织机构代码",
			orgNameErr:"请输入机构名称",
			orgRemarkErr:"请输入机构简称",
			organization:"组织机构管理",
			detail:"组织机构详情",
			lvl:"机构级别",
			name:"机构名称",
			remark:"机构简称",
			nameErr:"*请输入组织机构名称",
			ori:"组织机构",
			addOrg:"建立组织机构管理您的组织",
			addPro:"新增省局",
			addCity:"新增市局",
			addArea:"新增县区局",
			addOffice:"新增科室",
			deleteOrg:"删除当前机构",
			lvl_1:"根机构",
			pro:"省级",
			city:"市级",
			area:"县区级",
			office:"县区级科室",
			deleteConfirm:"是否确认删除该组织机构？",
			lvl_2:"市局",
			lvl_3:"县区局",
			selectPro:"请选择省局",
			selectCity:"请选择市局",
			selectArea:"请选择县区局",
			addChild:"新增下级机构",
			addUser:"新增本级人员",
			deleteUser:"删除人员",
			dataAuthority:"数据权限",
			orgCode:"机构代码",
			level:"机构级次",
			nameLimit:"请输入不超过150位汉字的机构名称",
			remarkLimit:"请输入不超过150位汉字的机构简称",
			codeLimit:"请输入11位组织机构代码"
		},
		taxpayer:{
			back:"返回",
			query:"查询",
			addTax:"新增纳税人",
			taxMsg:"约谈纳税人信息",
			taxInfo:"约谈纳税人信息维护",
			taxpayerName:"纳税人名称",
			taxpayerCode:"纳税人识别号",
			artificialName:"法人姓名",
			artificialId:"法人身份证号",
			artificial:"法人头像",
			artificialPhone:"法人手机号",
			financeName:"财务负责人姓名",
    		financeId:"财务负责人身份证号",
    		financePhone:"财务负责人手机号",
    		arrangeName:"办税人姓名",
    		arrangeId:"办税人身份证号",
    		arrangePhone:"办税人手机号",
    		loginPwd:"登录初始密码",
    		freezed:"账号冻结",
    		orgCode:"所属机构",
    		finance:"财务负责人头像",
    		arrange:"办税人头像",
    		addPayer:"新增企业",
    		deleteTaxpayer:"删除企业",
    		tip:"(如参加约谈是第三方人员，则在下方填写相关人员信息，以便于约谈的顺利进行)",
    		payerCodeLimit:"请输入纳税人识别号,为18位数字或字母组合",
    		payerNameLimit:"请输入纳税人名称,不超过50位字符",
    		artNameLimit:"请输入2-50位字符",
    		artIdLimit:"请输入法人身份证号,为18位数字字母组合",
    		artPhoneLimit:"请输入法人手机号",
    		finNameLimit:"请输入2-50位字符",
    		finIdLimit:"请输入财务身份证号,为18位数字字母组合",
    		finPhoneLimit:"请输入财务负责人手机号",
    		arrNameLimit:"请输入2-50位字符",
    		arrIdLimit:"请输入办税人身份证号,为18位数字字母组合",
    		arrPhoneLimit:"请输入办税人手机号",
    		exErr:"系统中已有该纳税人信息",
    		payerCodeErr:"不为空且为18位数字或字母组合",
    		payerNameErr:"不为空且不超过50位字符",
    		artificialNameErr:"请输入2-50位字符",
    		artificialIdErr:"不为空且为18位数字字母组合",
    		artificialPhoneErr:"不为空且为11位数字",
    		financeNameErr:"请输入2-50位字符",
    		financeIdErr:"不为空且为18位数字字母组合",
    		financePhoneErr:"不为空且为11位数字",
    		arrangeNameErr:"请输入2-50位字符",
    		arrangeIdErr:"不为空且为18位数字字母组合",
    		arrangePhoneErr:"不为空且为11位数字",
    		choosePic:"请选择图片",
    		addTaxpayer:"添加纳税人",
    		deleteTaxpayer:"删除纳税人",
    		importTax:"纳税人Excel导入",
    		imageTip:"支持上传jpg/jpeg/bmp/png格式的图片,且在2M以内"
		},
		formalInterview:{
			formalInterview:"在线约谈",
			addInterview:"创建约谈",
			organization:"组织机构",
			person:"参与人员",
			caseName:"约谈名称",
			payerCode:"纳税人识别号",
			permis:"应对机构",
			settleYear:"所属年度",
			dateTime:"检查所属期",
			caseTime:"约谈时间",
			beginDate:"开始时间",
			taxpayer:"税局人员",
			meetingStatus:"会议状态",
			payer:"被约谈人",
			operation:"约谈操作",
			interviewContinue:"继续约谈>>",
			interviewAgain:"再次约谈",
			interviewAgainTip:"将在本次约谈的基础上再次创建约谈，参会税局人员及被约谈人信息都不可修改，是否确认？",
			deleteConfirm:"是否确认删除?",
			nextStep:"下一步",
			editMeetingPerson:"修改会议人员",
			taxPerson:"税局人员",
			payerPerson:"约谈纳税人",
			nameOfCase:"案件名称",
			recorder:"记录人",
			choosePayer:"选择被约谈人",
			beginDate:"开始时间",
			otherPayer:"+被约谈人",
			prewStep:"上一步",
			create:"创建",
			otherPayerName:"被约谈人姓名",
			otherPayerPhone:"被约谈人手机号码",
			createMeeting:"创建约谈",
			nameErr:"*请输入正确的人员姓名",
			phoneErr:"*请输入正确的手机号",
			recorderErr:"*请选择记录人",
			createMeetingSuc:"创建会议成功",
			payerErr:"请选择纳税人",
			caseErr:"请输入240个字以内的约谈名称",
			dateTimeErr:"请选择正确的检查所属期",
			settleYearErr:"请选择正确的所属年度",
			beginDateErr:"请选择正确的开始时间",
			recorderErr:"请选择记录人",
			payerListErr:"请选择被约谈人",
			hostErr:"请选择主持人",
			host:"主持人"
		},
		formalInfo:{
			showVedio:"视频查看",
			showDoc:"笔录查看",
			showData:"资料查看",
			fileName:"文件名",
			size:"大小",
			uploadDate:"上传日期",
			formalInfo:"在线约谈资料查看",
			chooseData:"请选择要下载的文件"
		},
		menus:{
			homeIndex:{word:"首页",class:"zj-icon zj-icon-home"},
			account:{word:"账户设置",class:"zj-icon zj-icon-account"},
			organization:{word:"组织机构管理",class:"zj-icon zj-icon-organize"},
			infoMaint:{word:"税局信息维护",class:"zj-icon zj-icon-taxpayer"},
			taxpayer:{word:"纳税人信息维护",class:"zj-icon zj-icon-taxpayer"},
			interviewPreparation:{word:"约谈准备",class:"am-icon-home"},
			interVideo:{word:"约谈准备视频查看",class:"am-icon-home"},
			formalInterview:{word:"在线约谈",class:"zj-icon zj-icon-formal"},
			formalInfo:{word:"在线约谈资料查看",class:"zj-icon zj-icon-formalInfo"},
			roleAuth:{word:"角色权限管理",class:"zj-icon zj-icon-role"},
			sysLog:{word:"系统日志",class:"zj-icon zj-icon-role"}
		},
		roleAuth:{
			edit:"编辑",
			delete:"删除",
			roleAuth:"角色权限管理",
			next:"下一步",
			prew:"上一步",
			name:"姓名",
			roleType:"角色类型",
			account:"账号",
			roleCode:"角色代码",
			roleName:"角色名称：",
			roleCode_1:"角色code：",
			addRole:"添加角色",
			editRole:"编辑角色",
			deleteRole:"删除角色",
			config:"权限修改",
			sureDelete:"是否确认删除？",
			sureFreeze:"是否确认冻结？",
			sureThaw:"是否确认解冻？",
			selectRole:"选择角色",
			selectUser:"选择人员",
			addUser:"新增管理员信息",
			modifyUser:"编辑管理员信息",
			down:"完成",
			enterRoleName:"请输入角色名称",
			roleName_th:"角色名称",
			config_role:"配置功能权限",
			roleNameErr:"角色名称不为空且不超过64个字符"
		},
		log:{
			log:"系统日志",
			search:"搜索",
			reset:"重置",
			time:"发生时间",
			opeNum:"操作人员代码",
			ope:"操作人",
			operation:"操作内容",
			IP:"登录IP"
		},
		statistical:{
			statistical:"统计分析",
			date:"约谈时间",
			case:"约谈总户数",
			meeting:"约谈总次数",
			org:"应对机构",
			caseName:"约谈名称",
			taxCode:"纳税人识别号",
			dateTime:"检查所属期",
			meetingNum:"约谈次数",
			back:"返回"
		},
		latestReminder:"最新提醒",
		TNOPPITA:"本期活动已参加人数",
		TNOPDNPITCP:"本期活动未参加人数",
		TCFHBP:"本期党费已缴纳人数",
		TCNOUPF:"本期党费未缴纳人数",
		TNOPITTHBA:"本期测试已参加人数",
		TNOPWDNPITT:"本期测试未参加人数",
		latestUnreadMessage:"最新未读消息",
		pleaseEnterUserName:"请输入用户名",
		pleaseEnterYourPassword:"请输入密码",
		pleaseEnterYourSmsCode:"请输入短信验证码",
		shortMessage:"短信",
		uOrPError:"用户名或密码错误",
		unError:"*请输入有效的用户名",
		pwError:"*请输入有效的密码",
		codeError:"*验证码错误"
	};
	return words;
})