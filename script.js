$(function() {

		//JQuery initializers
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
		
		$("#seperator1").attr("disabled", true);
		$("#seperator2").attr("disabled", true);
		$("#prepositionDDL").attr("disabled", true);
		$("#preposotionCkhId").attr("checked", false);
		
		$('#timeId').mdtimepicker({
			timeFormat:'hh:mm',
			format:'hh:mm',
			// 'red', 'purple', 'indigo', 'teal', 'green', 'dark'
			theme:'indigo',
			readOnly:true,
			// determines if display value has zero padding for hour value less than 10 (i.e. 05:30 PM); 24-hour format has padding by default
			hourPadding:true,
			// determines if clear button is visible 
			clearBtn:true
		});
		
		// functions
		
		function convertHourToString(hours)
		{
			if(hours <= 9 )
				return "0" + hours;
			
			return hours + "";
		}
		
		function returnTimeOfDay(hours, minutes)
		{
			var date = new Date();
			date.setHours(hours);
			date.setMinutes(minutes);
			
			// 00:01 to 03:59 naktī
			var firstDate = new Date();
			firstDate.setHours(0);
			firstDate.setMinutes(1);
			
			var secondDate = new Date();
			secondDate.setHours(3);
			secondDate.setMinutes(59);
			
			if(date >= firstDate && date <= secondDate)
				return "Naktī";
			
			// 4:00 to 11:59 norītā
			firstDate.setHours(4);
			firstDate.setMinutes(0);
			
			secondDate.setHours(11);
			secondDate.setMinutes(59);
			if(date >= firstDate && date <= secondDate)
				return "Norītā";
			
			// 12:00 to 16:59 dienā
			firstDate.setHours(12);
			firstDate.setMinutes(0);
			
			secondDate.setHours(16);
			secondDate.setMinutes(59);
			if(date >= firstDate && date <= secondDate)
				return "Dienā";
			
			// 17:00 23:59 vakarā
			firstDate.setHours(17);
			firstDate.setMinutes(0);
			
			secondDate.setHours(23);
			secondDate.setMinutes(59);
			if(date >= firstDate && date <= secondDate)
				return "Vakarā";
			
			// 00:00 pusnakts
			return "pusnaktī";
		}
		
		function toFemaleNumber(numberText)
		{
			if(!checkNull(numberText)
				&& numberText.toLowerCase() != "trīs"
				&& !isEndWith(numberText, "t")
				&& numberText.toLowerCase() != "viens")
			{
				return numberText.substr(0, numberText.length - 1) + "as";
			}
			else if(!checkNull(numberText)
				&& numberText.toLowerCase() == "viens")
			{
				return numberText.substr(0, numberText.length - 1) + "a";
			}
		
			return numberText;
		}
		
		function isEndWith(word, charSequence)
		{
			if(word != null && word.length > 0
				&& charSequence != null && charSequence.length > 0)
			{
				var charSequenceLength = charSequence.length;
				var charEnding = word.toLowerCase().substr(word.length - charSequenceLength, word.length);
				
				if(charEnding === charSequence)
					return true;
			}
			
			return false;
		}
		
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
			
			//Check Exception Words List
			
			if(exceptionsConjugationListGenderKnown[wordLower] != undefined)
				return exceptionsConjugationListGenderKnown[wordLower].declaration;
			
			if (exceptionsConjugationListUnknown[wordLower] != undefined) {
				return "u"; //unknown
			}
			
			//if(isAdjective)
			//{
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
			//}
			
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
			var wordLower = word.toLowerCase();
			
			if(exceptionsConjugationListGenderKnown[wordLower] != undefined)
				return exceptionsConjugationListGenderKnown[wordLower].data;
			
			if (exceptionsConjugationListUnknown[wordLower] != undefined) {
				if(type === "u_f")
						return exceptionsConjugationListUnknown[wordLower].f_data;
					else
						return exceptionsConjugationListUnknown[wordLower].m_data;
			}
			
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
		var verbsVar = [];
		function loadAllVerbsList() {

			loadAllVerbs(returnVerbList, "shortlist");
			
			for(var i = 0; i < verbs.length; i++)
			{
				verbsVar.push(verbs[i].infinitivs);
			}
			
			$('#verbId').autocomplete({
				source: verbsVar,
				minLength : 3
			});
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
		
		function returnHourMinutesDeclaration(theNumber, isHour)
		{
			if(theNumber == 0)
			{
				if(isHour)
				{
					var pusNaktsType = returnDeclaration("Pusnakts", false);
					var pusNaktswordConjunction = returnConjunction("Pusnakts", pusNaktsType);
			
					return pusNaktswordConjunction;
				}
				else
					return ["", "", "", "", "", "", "", "", "", ""];
			}
			
			var numberText = convertHourToString(theNumber);
			
			var numberTensDigit = parseInt(numberText.substring(0,1)) * 10;
			var numberSingleDigit = parseInt(numberText.substring(1, 2));
			
			var numberTensText = (numberTensDigit != 0 && theNumber >= 20) ? numbers[numberTensDigit] : "" ;
			var numberSingleText = theNumber < 20 ? numbers[theNumber] : (numberSingleDigit != 0 ? numbers[numberSingleDigit] : "");
			
			if(!isHour) //minutes return female
				numberSingleText = toFemaleNumber(numberSingleText);
			
			var fullText = numberTensText + (numberTensText.length > 0 ? " " : "") + numberSingleText;
			
			var fullTextArray = fullText.split(" ");
			
			var newWordConjunction = [];
			
			if(fullTextArray.length == 2)
			{
				var type = returnDeclaration(fullTextArray[1], false);
				var wordConjunction = returnConjunction(fullTextArray[1], type);
				
				for(var i = 0; i < wordConjunction.length; i++)
				{
					if(wordConjunction[i] != "----")
						newWordConjunction.push(fullTextArray[0] + " " + wordConjunction[i]);
					else
					{
						if( i < 5)
						{
							newWordConjunction.push(fullTextArray[0] + " " + wordConjunction[i+5]);
						}
					}
				}
			
				return newWordConjunction;
			}
			else
			{
				var type = returnDeclaration(fullText, false);
				var wordConjunction = returnConjunction(fullText, type);
				
				for(var i = 0; i < wordConjunction.length; i++)
				{
					var item = "";
					if(wordConjunction[i] != "----")
						item = wordConjunction[i];
					else
					{
						if( i < 5)
						{
							item = wordConjunction[i+5];
						}
					}
					
					// Change hours to iem if ends with t
					if(i != 0 && isEndWith(item, "t") && isHour)
					{
						if( i == 9)
							item = item + "os";
						else	
							item = item + "iem";
					}
					
					newWordConjunction.push(item);
				}
				
				return newWordConjunction;
			}
		}
		
		function finalizeSentence(sentence)
		{
			if(checkNull(sentence))
				return "";
			
			var firstLetter = sentence.substr(0, 1);
			var restOfSentence = sentence.substr(1,sentence.length);
			
			return firstLetter.toUpperCase() + restOfSentence.toLowerCase();
		}
		
		// button handlers
		$( "#wordConjunctionBtn" ).click( function( event ) {
		      event.preventDefault();
		    
			// delete all rows
			var table = document.getElementById("tableConjunction");
			while(table.rows.length > 0) {
				table.deleteRow(0);
			}
			
			if(checkNull($("#wordId")[0].value))
				return;
			
			var wordList = $("#wordId")[0].value.split(" ");
			var word1 = wordList.length >= 1 ? wordList[0] : "";
			var word2 = wordList.length >= 2 ? wordList[1] : "";
			
			if(checkNull(word1))
				return;
			
			var type = returnDeclaration(word1, false);
			var wordConjunction;
			
			if(type == "u") //unknown
			{
				if(checkNull(word2))
					wordConjunction = returnConjunction(word1, "u_m");
				else
				{
					var word2Type = returnDeclaration(word2, false);
					var word2TypeGender = word2Type.split("_")[0];
					
					if(word2TypeGender == "af" || word2TypeGender == "4" || word2TypeGender == "5" || word2TypeGender == "6" ) //female
						wordConjunction = returnConjunction(word1, "u_f");
					else
						wordConjunction = returnConjunction(word1, "u_m"); //male
				}
			}
			else
				wordConjunction = returnConjunction(word1, type);
			
			var word2Conjunction = null;
			
			if(!checkNull(word2))
			{
				type = returnDeclaration(word2, false);
				word2Conjunction = returnConjunction(word2, type);
			}
			
			if($("#preposotionCkhId")[0].checked)
			{
				var selectedText = $( "#prepositionDDL option:selected" )[0].text.split(" ")[0];
				var selectedValue = $( "#prepositionDDL option:selected" )[0].value;
				
				var splitType = type.split("_");
				
				if(splitType.length == 2)
				{
					var conjunctionWord = "";
					
					if(splitType[1] == "s")
					{
						if(selectedValue == "ka")
						{
							if(!checkNull(word2) && word2Conjunction != null && word2Conjunction.length > 0)
								conjunctionWord = wordConjunction[1] + " " + word2Conjunction[1];
							else
								conjunctionWord = wordConjunction[1];
						}
						else if (selectedValue == "kam")
						{
							if(!checkNull(word2) && word2Conjunction != null && word2Conjunction.length > 0)
								conjunctionWord = wordConjunction[2] + " " + word2Conjunction[2];
							else
								conjunctionWord = wordConjunction[2];
						}
						else
						{
							if(!checkNull(word2) && word2Conjunction != null && word2Conjunction.length > 0)
								conjunctionWord = wordConjunction[3] + " " + word2Conjunction[3];
							else
								conjunctionWord = wordConjunction[3];
						}
					}
					else
					{
						if(!checkNull(word2) && word2Conjunction != null && word2Conjunction.length > 0)
								conjunctionWord = wordConjunction[7] + " " + word2Conjunction[7];
							else
								conjunctionWord = wordConjunction[7];
					}
					
					var row = table.insertRow(0);
					row.className = "row-style";
						
					var cell = row.insertCell(0);
					cell.innerHTML = finalizeSentence(selectedText + " " + conjunctionWord);
					
				}
				return;
			}
			
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
				
				
				if(!checkNull(word2) && word2Conjunction != null && word2Conjunction.length > 0)
				{
					if(word2Conjunction[i] != "----" && wordConjunction[i] != "----")
						cell.innerHTML = finalizeSentence(wordConjunction[i] + " " + word2Conjunction[i]);
					else
						cell.innerHTML = "----";
				}
				else
				{
					cell.innerHTML = finalizeSentence(wordConjunction[i]);
				}
					
				
				cell = row.insertCell(2);
				cell.innerHTML = questions[i + 5];
				
				cell = row.insertCell(3);
				
				if(!checkNull(word2) && word2Conjunction != null && word2Conjunction.length > 0)
				{
					if(word2Conjunction[i+5] != "----" && wordConjunction[i+5] != "----")
						cell.innerHTML = finalizeSentence(wordConjunction[i+5] + " " + word2Conjunction[i+5]);
					else
						cell.innerHTML = "----";
				}
				else
				{
					cell.innerHTML = finalizeSentence(wordConjunction[i+5]);
				}
				
				count++;
			}
		});
		
		$('#preposotionCkhId').change( function (event) {
			var checked = $("#preposotionCkhId")[0].checked;
			
			if(checked)
				$("#prepositionDDL")[0].disabled = false;
			else
				$("#prepositionDDL")[0].disabled = true;
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
			var wordAdjectiveConjunction = returnConjunction($("#adjectiveId")[0].value.trim(), type);
			
			type = returnDeclaration($("#wordAdjectiveId")[0].value.trim(), false);
			var wordConjunction = returnConjunction($("#wordAdjectiveId")[0].value.trim(), type);
			
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
			else
				return;
			
			var row = table.insertRow(0);
			row.className = "header-style";
			var cell = row.insertCell(0);
			cell.innerHTML = "Pamata pakāpe"
			cell = row.insertCell(1);
			cell.innerHTML = "Pārākā pakāpe";
			cell = row.insertCell(2);
			cell.innerHTML = "Vispārākā pakāpe";
					
			row = table.insertRow(1);
			row.className = "row-style";
			
			cell = row.insertCell(0);
			cell.innerHTML = finalizeSentence(wordLower);
			
			cell = row.insertCell(1);
			cell.innerHTML = finalizeSentence(wordLower.substring(0, wordLower.length - endingLength) + endings[0]);
			
			cell = row.insertCell(2);
			cell.innerHTML = "(Vis)" + wordLower.substring(0, wordLower.length - endingLength) + endings[1];
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
				cell.innerHTML = finalizeSentence(yearPronounce + " Gada," + dayPronounc + " " + monthPronounce);
				
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
			
			if(tabula != null && tabula.length == 6 && tabula[1].length > 0)
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
				cell.innerHTML =  finalizeSentence(tabula[1][1]);
				cell = row.insertCell(2);
				cell.className = "row-style";
				cell.innerHTML =  finalizeSentence(tabula[1][0]);
				cell = row.insertCell(3);
				cell.className = "row-style";
				cell.innerHTML =  finalizeSentence(tabula[1][2]);
				
				// Tu
				row = table.insertRow(2);
				cell = row.insertCell(0);
				cell.className = "header-style";
				cell.innerHTML = "Tu";
				cell = row.insertCell(1);
				cell.className = "row-style";
				cell.innerHTML =  finalizeSentence(tabula[2][1]);
				cell = row.insertCell(2);
				cell.className = "row-style";
				cell.innerHTML =  finalizeSentence(tabula[2][0]);
				cell = row.insertCell(3);
				cell.className = "row-style";
				cell.innerHTML =  finalizeSentence(tabula[2][2]);
				
				// Viņš
				row = table.insertRow(3);
				cell = row.insertCell(0);
				cell.className = "header-style";
				cell.innerHTML = "Viņš";
				cell = row.insertCell(1);
				cell.className = "row-style";
				cell.innerHTML =  finalizeSentence(tabula[3][1]);
				cell = row.insertCell(2);
				cell.className = "row-style";
				cell.innerHTML =  finalizeSentence(tabula[3][0]);
				cell = row.insertCell(3);
				cell.className = "row-style";
				cell.innerHTML =  finalizeSentence(tabula[3][2]);
				
				// Mēs
				row = table.insertRow(4);
				cell = row.insertCell(0);
				cell.className = "header-style";
				cell.innerHTML = "Mēs";
				cell = row.insertCell(1);
				cell.className = "row-style";
				cell.innerHTML =  finalizeSentence(tabula[4][1]);
				cell = row.insertCell(2);
				cell.className = "row-style";
				cell.innerHTML =  finalizeSentence(tabula[4][0]);
				cell = row.insertCell(3);
				cell.className = "row-style";
				cell.innerHTML =  finalizeSentence(tabula[4][2]);
				
				// Jūs
				row = table.insertRow(5);
				cell = row.insertCell(0);
				cell.className = "header-style";
				cell.innerHTML = "Jūs";
				cell = row.insertCell(1);
				cell.className = "row-style";
				cell.innerHTML =  finalizeSentence(tabula[5][1]);
				cell = row.insertCell(2);
				cell.className = "row-style";
				cell.innerHTML =  finalizeSentence(tabula[5][0]);
				cell = row.insertCell(3);
				cell.className = "row-style";
				cell.innerHTML =  finalizeSentence(tabula[5][2]);
				
				$('#nounVerbDiv')[0].style.display = 'block';
				
				var verbNoun = "";
				if(verb.toLowerCase().substr(verb.length-4, verb.length) == "ties")
					verbNoun = verb.substr(0, verb.length-4) + "šanās";
				else
					verbNoun = verb.substr(0, verb.length-1) + "šana";
				
				verbNoun = verbNoun.replaceAll("sš", "š");
				verbNoun = verbNoun.replaceAll("šš", "š");
				
				$('#verbNoun')[0].innerHTML = finalizeSentence(verbNoun);
			}
			else
			{
				var row = table.insertRow(0);
				row.className = "header-style";
				var cell = row.insertCell(0);
				cell.innerHTML = "Verb Not Found";
				
				$('#nounVerbDiv')[0].style.display = 'none';
				$('#verbNoun')[0].innerHTML = "";
			}
		});
		
		$( "#timeBtn" ).click( function( event ) {
			event.preventDefault();
		    var midnight = "Pusnakts";
			
			var table = document.getElementById("tableTime");
			while(table.rows.length > 0) {
				table.deleteRow(0);
			}
			
			if(checkNull($("#timeId")[0].value))
				return;
			
			var timeVal = $("#timeId")[0].value.split(":");
			
			var hours = parseInt(timeVal[0]);
			var minutes = parseInt(timeVal[1]);
			
			var minutesSingle = parseInt(timeVal[1].substring(1, 2))
			
			var timeDeclaration = {};
			timeDeclaration["fullHour"] = returnHourMinutesDeclaration(hours, true);
			timeDeclaration["fullHourPlusOne"] = returnHourMinutesDeclaration((hours != 23 ? hours+1 : 12), true);
			timeDeclaration["hoursMinus12"] = returnHourMinutesDeclaration((hours > 12 ? hours-12 : hours), true);
			var hoursMinus12 = hours > 12 ? hours-12 : hours;
			timeDeclaration["hoursMinus12Plus1"] = returnHourMinutesDeclaration((hoursMinus12 == 12 ? 1 : hoursMinus12 + 1), true);
			
			timeDeclaration["fullMinutes"] = returnHourMinutesDeclaration(minutes, false);
			//console.log(timeDeclaration);
			
			var cikVar = [];
			var cikosVar = [];
			var noCikiemVar = [];
			var lidzCikiemVar = [];
			
			var timeOfDay = returnTimeOfDay(hours, minutes);
			
			var minutesString = "Minūtes";
			
			if(minutesSingle == 1 && minutes != 11)
				minutesString = "Minūte";
			
			var minutesType = returnDeclaration(minutesString, false);
			var minutesConjugation = returnConjunction(minutesString, minutesType);
			var newMinutesConjunction = [];
			
			for(var i = 0; i < minutesConjugation.length; i++)
			{
				if(minutesConjugation[i] != "----")
					newMinutesConjunction.push(minutesConjugation[i]);
				else
				{
					if( i < 5)
					{
						newMinutesConjunction.push(minutesConjugation[i+5]);
					}
				}
			}
			
			/*
			1- Pronounce time as it is, all cases but 
				1-1- 00:00 (midnight)
					* Pusnakts
				1-2- from 00:01 to 00:39
					* minutes + pāri pusnakti
				1-3- from 00:40 to 00:59
					* Bez (minutes) + viens
					
			2- minutes = 30 
					*pus(hours+1) --> pusviens

			3- hours > 12
					* pronounce (hours - 12) as it is 
			4- if hours != 00 and minutes <= 39
				minutes pāri (hours)
			5- if minutes >= 40
				bez (minutes) + (hours +1)
			6- if hours != 00 and hours > 12 and minutes <= 39
				minutes pāri (hours - 12)
			7- if and hours > 12 and minutes >= 40
				bez (minutes)  (hours - 12)
			*/
			
			// 1- Pronounce time as it is in all cases but midnight
			// 1-1 if hour = 00
			if(hours == 0)
			{
				//1-2 if exactly midnight
				if(minutes == 0)
				{
					cikVar.push(timeDeclaration["fullHour"][0]);
					cikosVar.push(timeDeclaration["fullHour"][4]);
					noCikiemVar.push(timeDeclaration["fullHour"][1]);
					lidzCikiemVar.push(timeDeclaration["fullHour"][2]);
			
				}
				//1-3 if minutes <=39 AND NOT = 30
				else if(minutes <= 39 && minutes != 30)
				{
					cikVar.push(timeDeclaration["fullMinutes"][0] 
								+ " (" + newMinutesConjunction[0] + ") Pāri " + timeDeclaration["fullHour"][2]
								+ " (" + timeOfDay + ")");
					
					cikosVar.push(timeDeclaration["fullMinutes"][0] 
								+ " (" + newMinutesConjunction[0] + ") Pāri " + timeDeclaration["fullHour"][2]
								+ " (" + timeOfDay + ")");
					
					if(minutesSingle == 1 && minutes != 11)
					{
						noCikiemVar.push("No " + timeDeclaration["fullMinutes"][1] 
								+ " (" + newMinutesConjunction[1] + ") Pāri " + timeDeclaration["fullHour"][2]
								+ " (" + timeOfDay + ")");
					}
					else
					{
						noCikiemVar.push("No " + timeDeclaration["fullMinutes"][2] 
								+ " (" + newMinutesConjunction[2] + ") Pāri " + timeDeclaration["fullHour"][2]
								+ " (" + timeOfDay + ")");
					}
					
					lidzCikiemVar.push("Līdz " + timeDeclaration["fullMinutes"][2] 
								+ " (" + newMinutesConjunction[2] + ") Pāri " + timeDeclaration["fullHour"][2]
								+ " (" + timeOfDay + ")");
				}
			}
			//1-4 All other cases pronounce time as it is
			else
			{
				cikVar.push(timeDeclaration["fullHour"][0] + " " 
							+ timeDeclaration["fullMinutes"][0]
							+ (timeDeclaration["fullMinutes"][0].length > 0 ? " (" + newMinutesConjunction[0] + ")" : "")
							+ " (" + timeOfDay + ")");
							
				cikosVar.push(timeDeclaration["fullHour"][9] + " " 
							+ timeDeclaration["fullMinutes"][4]
							+ (timeDeclaration["fullMinutes"][4].length > 0 ? " (" + newMinutesConjunction[4] + ")" : "")
							+ " (" + timeOfDay + ")");
							
				if(minutesSingle == 1 && minutes != 11)
				{
					noCikiemVar.push("No " + timeDeclaration["fullHour"][7] + " " 
							+ timeDeclaration["fullMinutes"][1]
							+ (timeDeclaration["fullMinutes"][1].length > 0 ? " (" + newMinutesConjunction[1] + ")" : "")
							+ " (" + timeOfDay + ")");
				}
				else
				{
					noCikiemVar.push("No " + timeDeclaration["fullHour"][7] + " " 
							+ timeDeclaration["fullMinutes"][2]
							+ (timeDeclaration["fullMinutes"][2].length > 0 ? " (" + newMinutesConjunction[2] + ")" : "")
							+ " (" + timeOfDay + ")");
				}
				
				lidzCikiemVar.push("Līdz " + timeDeclaration["fullHour"][7] + " " 
							+ timeDeclaration["fullMinutes"][2]
							+ (timeDeclaration["fullMinutes"][2].length > 0 ? " (" + newMinutesConjunction[2] + ")" : "")
							+ " (" + timeOfDay + ")");
			}
			
			//2- If hours > 12 pronounce hours-12
			if(hours > 12)
			{
				cikVar.push(timeDeclaration["hoursMinus12"][0] + " " 
								+ timeDeclaration["fullMinutes"][0]
								+ (timeDeclaration["fullMinutes"][0].length > 0 ? " (" + newMinutesConjunction[0] + ")" : "")
								+ " (" + timeOfDay + ")");
				
				
				
				cikosVar.push(timeDeclaration["hoursMinus12"][9] + " " 
							+ timeDeclaration["fullMinutes"][4]
							+ (timeDeclaration["fullMinutes"][4].length > 0 ? " (" + newMinutesConjunction[4] + ")" : "")
							+ " (" + timeOfDay + ")");
							
				if(minutesSingle == 1 && minutes != 11)
				{
					noCikiemVar.push("No " + timeDeclaration["hoursMinus12"][7] + " " 
							+ timeDeclaration["fullMinutes"][1]
							+ (timeDeclaration["fullMinutes"][1].length > 0 ? " (" + newMinutesConjunction[1] + ")" : "")
							+ " (" + timeOfDay + ")");
				}
				else
				{
					noCikiemVar.push("No " + timeDeclaration["hoursMinus12"][7] + " " 
							+ timeDeclaration["fullMinutes"][2]
							+ (timeDeclaration["fullMinutes"][2].length > 0 ? " (" + newMinutesConjunction[2] + ")" : "")
							+ " (" + timeOfDay + ")");
				}
				
				lidzCikiemVar.push("Līdz " + timeDeclaration["hoursMinus12"][7] + " " 
							+ timeDeclaration["fullMinutes"][2]
							+ (timeDeclaration["fullMinutes"][2].length > 0 ? " (" + newMinutesConjunction[2] + ")" : "")
							+ " (" + timeOfDay + ")");
			}
			
			//3- If minutes == 30 (pus)
			if(minutes == 30)
			{
				cikVar.push("Pus" + timeDeclaration["fullHourPlusOne"][0] + " " 
								+ " (" + timeOfDay + ")");
				
				cikosVar.push("Pus" + timeDeclaration["fullHourPlusOne"][9] + " " 
								+ " (" + timeOfDay + ")");
				
				noCikiemVar.push("No " + "Pus" + timeDeclaration["fullHourPlusOne"][7] + " " 
								+ " (" + timeOfDay + ")");
								
				lidzCikiemVar.push("Līdz " + "Pus" + timeDeclaration["fullHourPlusOne"][7] + " " 
								+ " (" + timeOfDay + ")");
				
				if(hours >= 12 && hours != 23)
				{
					cikVar.push("Pus" + timeDeclaration["hoursMinus12Plus1"][0] + " " 
								+ " (" + timeOfDay + ")");
					
					cikosVar.push("Pus" + timeDeclaration["hoursMinus12Plus1"][9] + " " 
								+ " (" + timeOfDay + ")");
				
					noCikiemVar.push("No " + "Pus" + timeDeclaration["hoursMinus12Plus1"][7] + " " 
								+ " (" + timeOfDay + ")");
								
					lidzCikiemVar.push("Līdz " + "Pus" + timeDeclaration["hoursMinus12Plus1"][7] + " " 
								+ " (" + timeOfDay + ")");
				}
			}
			else
			{
				//4- if minutes <= 39 (pāri)
				if(minutes <= 39 && hours != 0 && minutes != 0)
				{
					cikVar.push(timeDeclaration["fullMinutes"][0] 
								+ " (" + newMinutesConjunction[0] + ") Pāri " + timeDeclaration["fullHour"][2]
								+ " (" + timeOfDay + ")");

					cikosVar.push(timeDeclaration["fullMinutes"][0] 
								+ " (" + newMinutesConjunction[0] + ") Pāri " + timeDeclaration["fullHour"][2]
								+ " (" + timeOfDay + ")");


					if(minutesSingle == 1 && minutes != 11)
					{
						noCikiemVar.push("No " + timeDeclaration["fullMinutes"][1] 
								+ " (" + newMinutesConjunction[1] + ") Pāri " + timeDeclaration["fullHour"][2]
								+ " (" + timeOfDay + ")");
					}
					else
					{
						noCikiemVar.push("No " + timeDeclaration["fullMinutes"][2] 
								+ " (" + newMinutesConjunction[2] + ") Pāri " + timeDeclaration["fullHour"][2]
								+ " (" + timeOfDay + ")");
					}

					lidzCikiemVar.push("Līdz " + timeDeclaration["fullMinutes"][2] 
								+ " (" + newMinutesConjunction[2] + ") Pāri " + timeDeclaration["fullHour"][2]
								+ " (" + timeOfDay + ")");

					if(hours > 12)
					{
						cikVar.push(timeDeclaration["fullMinutes"][0] 
								+ " (" + newMinutesConjunction[0] + ") Pāri " + timeDeclaration["hoursMinus12"][2]
								+ " (" + timeOfDay + ")");
								
						cikosVar.push(timeDeclaration["fullMinutes"][0] 
								+ " (" + newMinutesConjunction[0] + ") Pāri " + timeDeclaration["hoursMinus12"][2]
								+ " (" + timeOfDay + ")");
						
						if(minutesSingle == 1 && minutes != 11)
						{
							noCikiemVar.push("No " + timeDeclaration["fullMinutes"][1] 
									+ " (" + newMinutesConjunction[1] + ") Pāri " + timeDeclaration["hoursMinus12"][2]
									+ " (" + timeOfDay + ")");
						}
						else
						{
							noCikiemVar.push("No " + timeDeclaration["fullMinutes"][2] 
									+ " (" + newMinutesConjunction[2] + ") Pāri " + timeDeclaration["hoursMinus12"][2]
									+ " (" + timeOfDay + ")");
						}

						lidzCikiemVar.push("Līdz " + timeDeclaration["fullMinutes"][2] 
									+ " (" + newMinutesConjunction[2] + ") Pāri " + timeDeclaration["hoursMinus12"][2]
									+ " (" + timeOfDay + ")");
					}
				}
				//5- if minutes >= 40 (bez)
				else if(minutes >= 40 && minutes != 0)
				{
					var minus40Minutes = 60 - minutes;
					var minus40MinutesConjugation = returnHourMinutesDeclaration(minus40Minutes, false);
					
					//
					var minutesMinus40Single = parseInt(convertHourToString(minus40Minutes).substring(1, 2))
					minutesString = "Minūtes";
			
					if(minutesMinus40Single == 1 && minus40Minutes != 11)
						minutesString = "Minūte";
					
					var minutesMinus40Type = returnDeclaration(minutesString, false);
					var minutesMinus40Conjugation = returnConjunction(minutesString, minutesMinus40Type);
					var newMinutesMinus40Conjunction = [];
					
					for(var i = 0; i < minutesMinus40Conjugation.length; i++)
					{
						if(minutesMinus40Conjugation[i] != "----")
							newMinutesMinus40Conjunction.push(minutesMinus40Conjugation[i]);
						else
						{
							if( i < 5)
							{
								newMinutesMinus40Conjunction.push(minutesMinus40Conjugation[i+5]);
							}
						}
					}
					
					var finalMinutesString = minus40MinutesConjugation[2] + " (" + newMinutesMinus40Conjunction[2] + ") ";
					
					if(minutesMinus40Single == 1 && minus40Minutes != 11)
						finalMinutesString = minus40MinutesConjugation[1] + " (" + newMinutesMinus40Conjunction[1] + ") ";
					
					//
					
					cikVar.push("Bez "+ finalMinutesString + timeDeclaration["fullHourPlusOne"][0]
								+ " (" + timeOfDay + ")");
					
					cikosVar.push("Bez "+ finalMinutesString + timeDeclaration["fullHourPlusOne"][9]
								+ " (" + timeOfDay + ")");
					
					noCikiemVar.push("No " + "Bez "+ finalMinutesString + timeDeclaration["fullHourPlusOne"][7]
								+ " (" + timeOfDay + ")");
					
					lidzCikiemVar.push("Līdz " + "Bez "+ finalMinutesString + timeDeclaration["fullHourPlusOne"][7]
								+ " (" + timeOfDay + ")");
					
					if(hours >= 12 && hours != 23)
					{
						cikVar.push("Bez "+ finalMinutesString + timeDeclaration["hoursMinus12Plus1"][0]
								+ " (" + timeOfDay + ")");
								
						cikosVar.push("Bez "+ finalMinutesString + timeDeclaration["hoursMinus12Plus1"][9]
								+ " (" + timeOfDay + ")");
								
						noCikiemVar.push("No " + "Bez "+ finalMinutesString + timeDeclaration["hoursMinus12Plus1"][7]
								+ " (" + timeOfDay + ")");
					
						lidzCikiemVar.push("Līdz " + "Bez "+ finalMinutesString + timeDeclaration["hoursMinus12Plus1"][7]
								+ " (" + timeOfDay + ")");	
					}
				}
			}
			
			var row = table.insertRow(0);
			var cell = row.insertCell(0);
			cell.className = "header-style";
			cell.innerHTML = "Cik ir pulkstenis?";
			cell = row.insertCell(1);
			cell.className = "row-style";
			cell.innerHTML = "";
			
			for(var i=0; i<cikVar.length; i++)
				cell.innerHTML = cell.innerHTML + finalizeSentence(cikVar[i]) + "<br/>";
			
			row = table.insertRow(1);
			cell = row.insertCell(0);
			cell.className = "header-style";
			cell.innerHTML = "Cikos?";
			cell = row.insertCell(1);
			cell.className = "row-style";
			cell.innerHTML =  "";
			
			for(var i=0; i<cikosVar.length; i++)
				cell.innerHTML = cell.innerHTML + finalizeSentence(cikosVar[i]) + "<br/>";
			
			row = table.insertRow(2);
			cell = row.insertCell(0);
			cell.className = "header-style";
			cell.innerHTML = "No cikiem?";
			cell = row.insertCell(1);
			cell.className = "row-style";
			cell.innerHTML =  "";
			
			for(var i=0; i<noCikiemVar.length; i++)
				cell.innerHTML = cell.innerHTML + finalizeSentence(noCikiemVar[i]) + "<br/>";
			
			row = table.insertRow(3);
			cell = row.insertCell(0);
			cell.className = "header-style";
			cell.innerHTML = "Līdz cikiem?";
			cell = row.insertCell(1);
			cell.className = "row-style";
			cell.innerHTML =  "";
			
			for(var i=0; i<lidzCikiemVar.length; i++)
				cell.innerHTML = cell.innerHTML + finalizeSentence(lidzCikiemVar[i]) + "<br/>";
			
		});
		
		 $(document).ready(function() {
			loadAllVerbsList();
		 });
	});