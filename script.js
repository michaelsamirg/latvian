$(function() {

		$( "#accordion" ).accordion({
			heightStyle: "content",
			collapsible: true
		});
		
		$( "#dateId" ).datepicker(
			{
				showButtonPanel: true,
				changeYear: true,
				changeMonth: true,
			}
		);
		
		$("#prepositionDDL").selectmenu();
		$("#seperator1").attr("disabled", true);
		$("#seperator2").attr("disabled", true);
		$("#questionDDL").selectmenu();
		$("#prepositionDDL").selectmenu("refresh");
		
		
		
		function checkSixthWords(wordToCheck)
		{
			for( var i = 0; i < sexthDeclarWords.length; i++)
			{
				if(wordToCheck === sexthDeclarWords[i])
					return true;
			}
			
			return false;
		}
		
		function checkExceptionWords(wordToCheck)
		{
			for( var i = 0; i < exceptionsList.length; i++)
			{
				if(wordToCheck === exceptionsList[i])
					return true;
			}
			
			return false;
		}
		
		function returnDeclaration(word, isAdjective)
		{
			var wordLower = word.toLowerCase();
			
			var wordEnding = "";
			
			if(isAdjective)
			{
				wordEnding = wordLower.substr(wordLower.length-3, wordLower.length);
				
				if(wordEnding === "ais")
				{
					return "am_s";
				}
				
				wordEnding = wordLower.substr(wordLower.length-2, wordLower.length);
				
				if(wordEnding === "ie")
				{
					return "am_p";
				}
				else if(wordEnding === "ās")
				{
					return "af_p";
				}
				
				wordEnding = wordLower.substr(wordLower.length-1, wordLower.length);
				
				if(wordEnding === "ā")
				{
					return "af_s";
				}
			}
			
			wordEnding = wordLower.substr(wordLower.length-4, wordLower.length);
			
			//check words with ending pils like Daugavapils
			if(wordEnding === "pils")
			{
				return "6_s";
			}
			
			//Check words with ending 2 characters
			wordEnding = wordLower.substr(wordLower.length-2, wordLower.length);
			if(wordEnding === "is")
			{
				if(checkSixthWords(wordLower) == true)
					return "6_p";
				else
					return "2_s";
			}
			else if (wordEnding === "us")
			{
				return "3_s";
			}
			else if (wordEnding === "as")
			{
				return "4_p"
			}
			else if (wordEnding === "es")
			{
				return "5_p"
			}
			
			//Check words with ending 1 character
			wordEnding = wordLower.substr(wordLower.length-1, wordLower.length);
			
			if(wordEnding === "s" || wordEnding === "š")
			{
				if(checkSixthWords(wordLower) == true)
					return "6_s";
				else if(checkExceptionWords(wordLower) == true)
					return "1E_s";
				else if(wordLower === "suns")
					return "2E_s";
				else
					return "1_s";
			}
			else if(wordEnding === "a")
				return "4_s"
			else if (wordEnding === "e")
				return "5_s"
			else if (wordEnding === "i")
				return "1_p";
				
			return "";
		}
		
		function returnConjunction(word, type)
		{
			var wordConjunctionList;
			
			// Split type into declaration and singular or plural
			var splitType = type.split("_");
			
			if(splitType.length == 2)
			{
				var declaration = splitType[0];
				var singPlur = splitType[1];
				
				// find the corresponding declaration
				var declarationItem = wordConjunction["decalre_" + declaration];
				var isSinglare = (singPlur === "s") ? true : false;
				var endingLength = (isSinglare == true) ? declarationItem["singularLength"] : declarationItem["pluralLength"];
				var declarationList = declarationItem["declarationList"];
				
				// Change ending
				wordConjunctionList = changeEnding(word, declarationList, endingLength, isSinglare);
			}
			else
				wordConjunctionList = [word, word, word, word, word, word, word, word, word, word];
			
			//alert(wordConjunctionList);
			return wordConjunctionList;
		}
		
		function changeExchangeEndingWord(word){
		
			var wordLower = word.toLowerCase();
			
			var wordEnding = wordLower.substr(wordLower.length-2, wordLower.length);
			
			if(wordEnding == "sn")
				return word.substring(0, word.length-2) + "šņ";
			
			wordEnding = wordLower.substr(wordLower.length-1, wordLower.length);
			for(var i = 0; i < exchange.length; i++)
			{
				if(wordEnding == exchange[i][0])
					return word.substring(0, word.length-1) +exchange[i][1];
			}
			
			return word;
		}
		
		function changeEnding(word, endingList, endingLength, isSingular)
		{
			var wordConjunction = [];
			
			if(isSingular)
				wordConjunction.push(word)
			else
				wordConjunction.push("----");
				
			for(var i = 1; i < endingList.length; i++)
			{
				if(!isSingular && i <= 5)
				{
					if (i == 5)
						wordConjunction.push(word);
					else
						wordConjunction.push("----");
						
					continue;
				}
				
				var endingChar = endingList[i];
				var newWord = word.substring(0, word.length - endingLength);
				
				//check * in ending
				if(endingChar.substring(0, 1) == "*")
				{
					endingChar = endingChar.substring(1, endingChar.length);
					newWord = changeExchangeEndingWord(newWord);
				}
				
				newWord = newWord + endingChar;
				wordConjunction.push(newWord);
			}
			
			return wordConjunction;
		}
		
		function checkNull(str)
		{
			if(str === undefined || str === null)
				return true;
				
			if(str.trim().length == 0)
				return true;
				
			return false;
		}
		
		// Verbs functions 
		// load all verbs
		var verbs;
		function loadAllVerbsList() {

			loadAllVerbs(returnVerbList, "shortlist");
			
		}
		
		function returnVerbList(verbsList)
		{
			verbs = verbsList;
		}
		
		function findVerbJson(query)
		{
			var verbJson = "";
			for (i = 0; i < verbs.length; i++) {
                  
                if (verbs[i].infinitivs === query) {
                  
				  console.log(verbs[i]);
                  verbJson = verbs[i];
                }
            }
			
			return verbJson;
		}
		
		
		///
		
		
		$( "#wordConjunctionBtn" ).click( function( event ) {
		      event.preventDefault();
		    
			// delete all rows
			var table = document.getElementById("tableConjunction");
			while(table.rows.length > 0) {
				table.deleteRow(0);
			}
			
			if(checkNull($("#wordId")[0].value))
				return;
			
			var type = returnDeclaration($("#wordId")[0].value.trim(), false);
			var wordConjunction = returnConjunction($("#wordId")[0].value.trim(), type)
			
			var count = 0;
			var row = table.insertRow(count);
			row.className = "header-style";
			var cell = row.insertCell(0);
			cell.innerHTML = "Vienskaitlis";
			cell.colSpan = 2;
			cell = row.insertCell(1);
			cell.innerHTML = "Daudzskaitlis";
			cell.colSpan = 2;
					
			count++;
			for(var i = 0; i < wordConjunction.length / 2; i++)
			{
			
				row = table.insertRow(count);
				row.className = "row-style";
					
				cell = row.insertCell(0);
				cell.innerHTML = questions[i];
				
				cell = row.insertCell(1);
				cell.innerHTML = wordConjunction[i];
				
				
				cell = row.insertCell(2);
				cell.innerHTML = questions[i + 5];
				
				cell = row.insertCell(3);
				cell.innerHTML = wordConjunction[i + 5];
				
				count++;
			}
		});
		
		$("#wordPrepositionBtn").click( function( event ) {
		      event.preventDefault();
			 
			var table = document.getElementById("tablePreposition");
			while(table.rows.length > 0) {
				table.deleteRow(0);
			}
			
			if(checkNull($("#wordPrepositionId")[0].value))
				return;
			 
			var type = returnDeclaration($("#wordPrepositionId")[0].value.trim(), false);
			var wordConjunction = returnConjunction($("#wordPrepositionId")[0].value.trim(), type);
			
			var selectedText = $( "#prepositionDDL option:selected" )[0].text.split(" ")[0];
			var selectedValue = $( "#prepositionDDL option:selected" )[0].value;
			
			var splitType = type.split("_");
			
			if(splitType.length == 2)
			{
				var conjunctionWord = "";
				
				if(splitType[1] == "s")
				{
					if(selectedValue == "ka")
						conjunctionWord = wordConjunction[1];
					else if (selectedValue == "kam")
						conjunctionWord = wordConjunction[2];
					else
						conjunctionWord = wordConjunction[3];
				}
				else
					conjunctionWord = wordConjunction[7];
				
				var row = table.insertRow(0);
				row.className = "row-style";
					
				var cell = row.insertCell(0);
				cell.innerHTML = selectedText + " " + conjunctionWord;
			}
			
		});
		
		$( "#wordAdjectiveBtn" ).click( function( event ) {
		      event.preventDefault();
		    
			// delete all rows
			var table = document.getElementById("tableAdjective");
			while(table.rows.length > 0) {
				table.deleteRow(0);
			}
			
			if(checkNull($("#adjectiveId")[0].value) || checkNull($("#wordAdjectiveId")[0].value))
				return;
			
			var type = returnDeclaration($("#adjectiveId")[0].value.trim(), true);
			var wordAdjectiveConjunction = returnConjunction($("#adjectiveId")[0].value.trim(), type)
			
			type = returnDeclaration($("#wordAdjectiveId")[0].value.trim(), false);
			var wordConjunction = returnConjunction($("#wordAdjectiveId")[0].value.trim(), type)
			
			var count = 0;
			var row = table.insertRow(count);
			row.className = "header-style";
			var cell = row.insertCell(0);
			cell.innerHTML = "Vienskaitlis";
			cell.colSpan = 2;
			cell = row.insertCell(1);
			cell.innerHTML = "Daudzskaitlis";
			cell.colSpan = 2;
					
			count++;
			for(var i = 0; i < wordConjunction.length / 2; i++)
			{
			
				row = table.insertRow(count);
				row.className = "row-style";
					
				cell = row.insertCell(0);
				cell.innerHTML = questions[i];
				
				cell = row.insertCell(1);
				
				if(wordAdjectiveConjunction[i] != "----" && wordConjunction[i] != "----")
					cell.innerHTML = wordAdjectiveConjunction[i] + " " + wordConjunction[i];
				else
					cell.innerHTML = "----"
				
				cell = row.insertCell(2);
				cell.innerHTML = questions[i + 5];
				
				cell = row.insertCell(3);
				
				if(wordAdjectiveConjunction[i + 5] != "----" && wordConjunction[i + 5] != "----")
					cell.innerHTML = wordAdjectiveConjunction[i + 5] + " " + wordConjunction[i + 5];
				else
					cell.innerHTML = "----"
					
				count++;
			}
		});
		
		$( "#wordComparativeBtn" ).click( function( event ) {
		      event.preventDefault();
		    
			// delete all rows
			var table = document.getElementById("tableComparative");
			while(table.rows.length > 0) {
				table.deleteRow(0);
			}
			
			if(checkNull($("#wordComparativeId")[0].value))
				return;
			
			var endingLength = 0;
			var endings = ["āks", "ākais"];
			var wordLower = $("#wordComparativeId")[0].value.trim().toLowerCase();
			var word = $("#wordComparativeId")[0].value.trim();
			
			if( wordLower.substr(wordLower.length-2, wordLower.length) === 'as')
			{
				 endingLength = 2;
				 endings = ["ākas", "ākās"];
			}
			else if(wordLower.substr(wordLower.length-1, wordLower.length) === 'a')
			{
				endingLength = 1;
				endings = ["āka", "ākā"];
			}
			else if(wordLower.substr(wordLower.length-1, wordLower.length) === 's')
			{
				endingLength = 1;
				endings = ["āks", "ākais"];
			}
			else if(wordLower.substr(wordLower.length-1, wordLower.length) === 'i')
			{
				endingLength = 1;
				endings = ["āki", "ākie"];
			}
			
			var row = table.insertRow(0);
			row.className = "header-style";
			var cell = row.insertCell(0);
			cell.innerHTML = "Labāk";
			cell = row.insertCell(1);
			cell.innerHTML = "Labākais";
					
			row = table.insertRow(1);
			row.className = "row-style";
				
			cell = row.insertCell(0);
			cell.innerHTML = word.substring(0, word.length - endingLength) + endings[0];
			
			cell = row.insertCell(1);
			cell.innerHTML = "Vis" + wordLower.substring(0, wordLower.length - endingLength) + endings[1];
		});
		
		$( "#dateBtn" ).click( function( event ) {
			 event.preventDefault();
		    
		
			if($("#dateId")[0].value != null && $("#dateId")[0].value.trim().length > 0)
			{
				var date = new Date($("#dateId")[0].value);
				
				var fullYear = date.getFullYear();
				var day = date.getDate();
				var month = date.getMonth();
				
				//1- read year
				var fullYearStr = fullYear+"";
				var found = false;
				var yearPronounce = "";
				
				var zeros = "";
				
				
				for(var i = 0; i < 4- fullYearStr.length; i++)
				{
					zeros += "0";
				}
				
				fullYearStr = zeros + fullYearStr;
				
				//read last 2 digits
				if(parseInt(fullYearStr.substring(2,4)) > 0)
				{
					found = true;
					//read from ordering
					
					if( numberOrdering[parseInt(fullYearStr.substring(2,4))] != null
							&& numberOrdering[parseInt(fullYearStr.substring(2,4))].length > 0)
					{
						yearPronounce = numberOrdering[parseInt(fullYearStr.substring(2,4))].replace("ais", "ā");
					}
					else
					{
						var tensDigit = parseInt(fullYearStr.substring(2,3)) * 10;
						var singleDigit = parseInt(fullYearStr.substring(3, 4));
						
						yearPronounce = numbers[tensDigit] + " " + numberOrdering[singleDigit].replace("ais", "ā");
					}
				}
				
				//read hundreds 
				if(parseInt(fullYearStr.substring(1,2)) > 0)
				{
					var hundredsDigit = parseInt(fullYearStr.substring(1,2)) * 100;
					if(found)
					{
						//read from numbers
						yearPronounce = numbers[hundredsDigit] + " " + yearPronounce;
					}
					else
					{
						//read from ordering
						yearPronounce = numberOrdering[hundredsDigit].replace("ais", "ā");
					}
					
					found = true;
				}
				
				
				//read thousands
				if(parseInt(fullYearStr.substring(0,1)) > 0)
				{
					var thousandsDigit = parseInt(fullYearStr.substring(0,1)) * 1000;
					
					if(found)
					{
						//read from numbers
						yearPronounce = numbers[thousandsDigit] + " " + yearPronounce;
					}
					else
					{
						//read from ordering
						yearPronounce = numberOrdering[thousandsDigit].replace("ais", "ā");
					}
				}
				
				
				var question =$( "#questionDDL option:selected" )[0].value;
				
				var dayPronounc;
				if( numberOrdering[day] != null
						&& numberOrdering[day].length > 0)
				{
					if(question == "kas")
						dayPronounc = numberOrdering[day];
					else	
					{
						var dayConjunction = returnConjunction(numberOrdering[day], "am_s");
						
						if(dayConjunction != null && dayConjunction.length >=5)
							dayPronounc = dayConjunction[4];
						else
							dayPronounc = numberOrdering[day];
					}
				}
				else
				{
					var dayStr = day + "";
					var tensDigit = parseInt(dayStr.substring(0,1)) * 10;
					var singleDigit = parseInt(dayStr.substring(1, 2));
					
					
					var singleDayPronounce = "";
					
					if(question == "kas")
					{
						singleDayPronounce = numberOrdering[singleDigit];
					}
					else
					{
						var dayConjunction = returnConjunction(numberOrdering[singleDigit], "am_s");
						
						if(dayConjunction != null && dayConjunction.length >=5)
							singleDayPronounce = dayConjunction[4];
						else
							singleDayPronounce = numberOrdering[day];
					}
					
					dayPronounc = numbers[tensDigit] + " " + singleDayPronounce;
				}
				
				var monthPronounce = "";
				
				if(question == "kas")
				{
					monthPronounce = months[month];
				}
				else
				{
					var monthType = returnDeclaration(months[month], false);
					var monthConjunction = returnConjunction(months[month], monthType);
						
					if(monthConjunction != null && monthConjunction.length >=5)
						monthPronounce = monthConjunction[4];
					else
						monthPronounce = months[month];
				}
				
				var table = document.getElementById("tableDate");
				while(table.rows.length > 0) {
					table.deleteRow(0);
				}
				
				var row = table.insertRow(0);
				row.className = "row-style";
					
				var cell = row.insertCell(0);
				cell.innerHTML = yearPronounce + " Gada," + dayPronounc + " " + monthPronounce;
				
			}
		});
		
		$( "#verbConjunctionBtn" ).click( function( event ) {
			event.preventDefault();
		    
			var table = document.getElementById("tableVerbs");
			while(table.rows.length > 0) {
				table.deleteRow(0);
			}
			
			if(checkNull($("#verbId")[0].value))
				return;
			
			var verb = $("#verbId")[0].value;
			
			var verbJson = findVerbJson(verb.toLowerCase().trim());
			
			if(verbJson == null || (verbJson != null && verbJson.length > 0))
			{
				alert("Verb not found");
				return;
			}
				
			var tabula = konjugat(verbJson);
			
			if(tabula != null && tabula.length == 6)
			{
				var row = table.insertRow(0);
				row.className = "header-style";
				var cell = row.insertCell(0);
				cell.innerHTML = "";
				cell = row.insertCell(1);
				cell.innerHTML = "Tagadne";
				cell = row.insertCell(2);
				cell.innerHTML = "Pagātne";
				cell = row.insertCell(3);
				cell.innerHTML = "Nākotne";
				
				// Es
				row = table.insertRow(1);
				cell = row.insertCell(0);
				cell.className = "header-style";
				cell.innerHTML = "Es";
				cell = row.insertCell(1);
				cell.className = "row-style";
				cell.innerHTML =  tabula[1][1];
				cell = row.insertCell(2);
				cell.className = "row-style";
				cell.innerHTML =  tabula[1][0];
				cell = row.insertCell(3);
				cell.className = "row-style";
				cell.innerHTML =  tabula[1][2];
				
				// Tu
				row = table.insertRow(2);
				cell = row.insertCell(0);
				cell.className = "header-style";
				cell.innerHTML = "Tu";
				cell = row.insertCell(1);
				cell.className = "row-style";
				cell.innerHTML =  tabula[2][1];
				cell = row.insertCell(2);
				cell.className = "row-style";
				cell.innerHTML =  tabula[2][0];
				cell = row.insertCell(3);
				cell.className = "row-style";
				cell.innerHTML =  tabula[2][2];
				
				// Viņš
				row = table.insertRow(3);
				cell = row.insertCell(0);
				cell.className = "header-style";
				cell.innerHTML = "Viņš";
				cell = row.insertCell(1);
				cell.className = "row-style";
				cell.innerHTML =  tabula[3][1];
				cell = row.insertCell(2);
				cell.className = "row-style";
				cell.innerHTML =  tabula[3][0];
				cell = row.insertCell(3);
				cell.className = "row-style";
				cell.innerHTML =  tabula[3][2];
				
				// Mēs
				row = table.insertRow(4);
				cell = row.insertCell(0);
				cell.className = "header-style";
				cell.innerHTML = "Mēs";
				cell = row.insertCell(1);
				cell.className = "row-style";
				cell.innerHTML =  tabula[4][1];
				cell = row.insertCell(2);
				cell.className = "row-style";
				cell.innerHTML =  tabula[4][0];
				cell = row.insertCell(3);
				cell.className = "row-style";
				cell.innerHTML =  tabula[4][2];
				
				// Jūs
				row = table.insertRow(5);
				cell = row.insertCell(0);
				cell.className = "header-style";
				cell.innerHTML = "Jūs";
				cell = row.insertCell(1);
				cell.className = "row-style";
				cell.innerHTML =  tabula[5][1];
				cell = row.insertCell(2);
				cell.className = "row-style";
				cell.innerHTML =  tabula[5][0];
				cell = row.insertCell(3);
				cell.className = "row-style";
				cell.innerHTML =  tabula[5][2];
			}
			else
				alert("Verb not found");
		
		});
		
		 $(document).ready(function() {
			loadAllVerbsList();
		 });
	});