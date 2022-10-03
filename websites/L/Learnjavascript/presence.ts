const presence = new Presence({
		clientId: "1024006470364315668",
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
		largeImageKey: "https://i.imgur.com/03uHFM5.png",
		startTimestamp: browsingTimestamp,
	};
	if (document.location.pathname === "/")
		presenceData.details = "Viewing home page";
	else if (document.location.pathname === "/app.html") {
		const taskid = parseInt(document.URL.split("=")[1]),
			statee = document.querySelectorAll("title")[0].textContent.split("|")[0];
		if (!taskid || !statee) return;

		if (taskid >= 1435 && taskid <= 1439) {
			presenceData.details = "1. Basic Functions";
			presenceData.state = `${statee}(Page ${taskid - 1434} of 5)`;
		} else if (taskid >= 1440 && taskid <= 1460) {
			presenceData.details = "2. Strings I";
			presenceData.state = `${statee}(Page ${taskid - 1439} of 21)`;
		} else if (taskid >= 1461 && taskid <= 1468) {
			presenceData.details = "3. Numbers";
			presenceData.state = `${statee}(Page ${taskid - 1460} of 8)`;
		} else if (taskid >= 1469 && taskid <= 1472) {
			presenceData.details = "4. Variables";
			presenceData.state = `${statee}(Page ${taskid - 1468} of 4)`;
		} else if (taskid >= 1473 && taskid <= 1482) {
			presenceData.details = "5. Conditions";
			presenceData.state = `${statee}(Page ${taskid - 1472} of 10)`;
		} else if (taskid >= 1483 && taskid <= 1499) {
			presenceData.details = "6. Arrays I";
			presenceData.state = `${statee}(Page ${taskid - 1482} of 17)`;
		} else if (taskid >= 1500 && taskid <= 1511) {
			presenceData.details = "7. Arrays II & callbacks";
			presenceData.state = `${statee}(Page ${taskid - 1499} of 12)`;
		} else if (taskid >= 1512 && taskid <= 1518) {
			presenceData.details = "8. Objects I";
			presenceData.state = `${statee}(Page ${taskid - 1511} of 7)`;
		} else if (taskid >= 1519 && taskid <= 1530) {
			presenceData.details = "9. Arrow functions";
			presenceData.state = `${statee}(Page ${taskid - 1518} of 12)`;
		} else if (taskid >= 1531 && taskid <= 1540) {
			presenceData.details = "10. Implicit return";
			presenceData.state = `${statee}(Page ${taskid - 1530} of 10)`;
		} else if (taskid >= 1541 && taskid <= 1548) {
			presenceData.details = "11. Strings II";
			presenceData.state = `${statee}(Page ${taskid - 1540} of 8)`;
		} else if (taskid >= 1549 && taskid <= 1559) {
			presenceData.details = "12. Arrays III";
			presenceData.state = `${statee}(Page ${taskid - 1548} of 11)`;
		} else if (taskid >= 1560 && taskid <= 1567) {
			presenceData.details = "13. Array reduce";
			presenceData.state = `${statee}(Page ${taskid - 1559} of 8)`;
		} else if (taskid >= 1568 && taskid <= 1573) {
			presenceData.details = "14. Array destructuring & concat";
			presenceData.state = `${statee}(Page ${taskid - 1567} of 6)`;
		} else if (taskid >= 1574 && taskid <= 1583) {
			presenceData.details = "15. Objects II";
			presenceData.state = `${statee}(Page ${taskid - 1573} of 10)`;
		} else if (taskid >= 1584 && taskid <= 1591) {
			presenceData.details = "16. Objects III";
			presenceData.state = `${statee}(Page ${taskid - 1583} of 8)`;
		} else if (taskid >= 1592 && taskid <= 1598) {
			presenceData.details = "17. Optional Chaining";
			presenceData.state = `${statee}(Page ${taskid - 1591} of 7)`;
		} else if (taskid >= 1599 && taskid <= 1607) {
			presenceData.details = "18. Nullish coalescing";
			presenceData.state = `${statee}(Page ${taskid - 1598} of 9)`;
		} else if (taskid >= 1608 && taskid <= 1611) {
			presenceData.details = "19. Advanced control flow";
			presenceData.state = `${statee}(Page ${taskid - 1607} of 4)`;
		} else if (taskid >= 1612 && taskid <= 1621) {
			presenceData.details = "20. Arrays of objects I";
			presenceData.state = `${statee}(Page ${taskid - 1611} of 9)`;
		} else if (taskid >= 1622 && taskid <= 1629) {
			presenceData.details = "21. Arrays of objects II";
			presenceData.state = `${statee}(Page ${taskid - 1621} of 8)`;
		} else if (taskid >= 1630 && taskid <= 1634) {
			presenceData.details = "22. Reducing arrays of objects";
			presenceData.state = `${statee}(Page ${taskid - 1629} of 5)`;
		} else if (taskid >= 1635 && taskid <= 1638) {
			presenceData.details = "23. Try catch";
			presenceData.state = `${statee}(Page ${taskid - 1634} of 4)`;
		} else if (taskid >= 1639 && taskid <= 1643) {
			presenceData.details = "24. Semi-colons";
			presenceData.state = `${statee}(Page ${taskid - 1638} of 5)`;
		} else if (taskid >= 1644 && taskid <= 1649) {
			presenceData.details = "25. Immutability";
			presenceData.state = `${statee}(Page ${taskid - 1643} of 6)`;
		} else if (taskid >= 1650 && taskid <= 1656) {
			presenceData.details = "26. Mutable to immutable";
			presenceData.state = `${statee}(Page ${taskid - 1649} of 7)`;
		} else if (taskid >= 1657 && taskid <= 1663) {
			presenceData.details = "27. Introduction to classes";
			presenceData.state = `${statee}(Page ${taskid - 1656} of 7)`;
		} else if (taskid >= 1664 && taskid <= 1669) {
			presenceData.details = "28. Class instance methods";
			presenceData.state = `${statee}(Page ${taskid - 1663} of 6)`;
		} else if (taskid >= 1670 && taskid <= 1676) {
			presenceData.details = "29. Class concepts";
			presenceData.state = `${statee}(Page ${taskid - 1669} of 7)`;
		} else if (taskid >= 1677 && taskid <= 1683) {
			presenceData.details = "30. Class inheritance";
			presenceData.state = `${statee}(Page ${taskid - 1676} of 7)`;
		} else if (taskid >= 1684 && taskid <= 1689) {
			presenceData.details = "31. Prototypical inheritance";
			presenceData.state = `${statee}(Page ${taskid - 1683} of 6)`;
		} else if (taskid >= 1690 && taskid <= 1696) {
			presenceData.details = "32. Classes in front-end libraries";
			presenceData.state = `${statee}(Page ${taskid - 1689} of 7)`;
		} else if (taskid >= 1697 && taskid <= 1701) {
			presenceData.details = "33. Public and private fields";
			presenceData.state = `${statee}(Page ${taskid - 1696} of 5)`;
		} else if (taskid >= 1702 && taskid <= 1708) {
			presenceData.details = "34. Asynchronous callbacks";
			presenceData.state = `${statee}(Page ${taskid - 1701} of 7)`;
		} else if (taskid >= 1709 && taskid <= 1713) {
			presenceData.details = "35. Callback pattern";
			presenceData.state = `${statee}(Page ${taskid - 1708} of 5)`;
		} else if (taskid >= 1714 && taskid <= 1720) {
			presenceData.details = "36. Intro to promises";
			presenceData.state = `${statee}(Page ${taskid - 1713} of 7)`;
		} else if (taskid >= 1721 && taskid <= 1727) {
			presenceData.details = "37. Using promises";
			presenceData.state = `${statee}(Page ${taskid - 1720} of 7)`;
		} else if (taskid >= 1728 && taskid <= 1733) {
			presenceData.details = "38. Promise rejection";
			presenceData.state = `${statee}(Page ${taskid - 1727} of 6)`;
		} else if (taskid >= 1734 && taskid <= 1739) {
			presenceData.details = "39. Creating promises";
			presenceData.state = `${statee}(Page ${taskid - 1733} of 6)`;
		} else if (taskid >= 1740 && taskid <= 1743) {
			presenceData.details = "40. Rejecting promises";
			presenceData.state = `${statee}(Page ${taskid - 1739} of 4)`;
		} else if (taskid >= 1744 && taskid <= 1748) {
			presenceData.details = "41. JSON";
			presenceData.state = `${statee}(Page ${taskid - 1743} of 5)`;
		} else if (taskid >= 1749 && taskid <= 1756) {
			presenceData.details = "42. Intro to fetch";
			presenceData.state = `${statee}(Page ${taskid - 1748} of 8)`;
		} else if (taskid >= 1757 && taskid <= 1762) {
			presenceData.details = "43. Working with fetch";
			presenceData.state = `${statee}(Page ${taskid - 1756} of 6)`;
		} else if (taskid >= 1763 && taskid <= 1767) {
			presenceData.details = "44. Handling fetch errors";
			presenceData.state = `${statee}(Page ${taskid - 1762} of 5)`;
		} else if (taskid >= 1768 && taskid <= 1772) {
			presenceData.details = "45. Fetch post, put and delete";
			presenceData.state = `${statee}(Page ${taskid - 1767} of 5)`;
		} else if (taskid >= 1773 && taskid <= 1779) {
			presenceData.details = "46. Modules";
			presenceData.state = `${statee}(Page ${taskid - 1772} of 8)`;
		} else if (taskid >= 1780 && taskid <= 1792) {
			presenceData.details = "47. Fetch wrapper";
			presenceData.state = `${statee}(Page ${taskid - 1779} of 13)`;
		} else if (taskid >= 1793 && taskid <= 1801) {
			presenceData.details = "48. DOM Selection I";
			presenceData.state = `${statee}(Page ${taskid - 1801} of 9)`;
		} else if (taskid >= 1802 && taskid <= 1811) {
			presenceData.details = "49. DOM Selection II";
			presenceData.state = `${statee}(Page ${taskid - 1801} of 10)`;
		} else if (taskid >= 1812 && taskid <= 1823) {
			presenceData.details = "50. DOM innerHTML and value";
			presenceData.state = `${statee}(Page ${taskid - 1811} of 12)`;
		} else if (taskid >= 1824 && taskid <= 1831) {
			presenceData.details = "51. DOM classes";
			presenceData.state = `${statee}(Page ${taskid - 1823} of 8)`;
		} else if (taskid >= 1832 && taskid <= 1839) {
			presenceData.details = "52. DOM attributes and styles";
			presenceData.state = `${statee}(Page ${taskid - 1831} of 8)`;
		} else if (taskid >= 1840 && taskid <= 1849) {
			presenceData.details = "53. DOM Misc";
			presenceData.state = `${statee}(Page ${taskid - 1839} of 10)`;
		} else if (taskid >= 1850 && taskid <= 1859) {
			presenceData.details = "54. DOM append and prepend";
			presenceData.state = `${statee}(Page ${taskid - 1849} of 9)`;
		} else if (taskid >= 1860 && taskid <= 1868) {
			presenceData.details = "55. DOM Events I";
			presenceData.state = `${statee}(Page ${taskid - 1859} of 9)`;
		} else if (taskid >= 1869 && taskid <= 1881) {
			presenceData.details = "56. DOM Events II";
			presenceData.state = `${statee}(Page ${taskid - 1868} of 13)`;
		} else if (taskid >= 1882 && taskid <= 1887) {
			presenceData.details = "57. DOM Forms";
			presenceData.state = `${statee}(Page ${taskid - 1881} of 6)`;
		} else if (taskid >= 1888 && taskid <= 1900) {
			presenceData.details = "58. DOM Events III";
			presenceData.state = `${statee}(Page ${taskid - 1887} of 13)`;
		} else if (taskid >= 1901 && taskid <= 1906) {
			presenceData.details = "59. DOM + fetch";
			presenceData.state = `${statee}(Page ${taskid - 1900} of 6)`;
		} else if (taskid >= 1907 && taskid <= 1910) {
			presenceData.details = "60. DOM + fetch real APIs";
			presenceData.state = `${statee}(Page ${taskid - 1906} of 4)`;
		} else if (taskid >= 1911 && taskid <= 1914) {
			presenceData.details = "61. DOM Outro";
			presenceData.state = `${statee}(Page ${taskid - 1910} of 4)`;
		} else if (taskid >= 1915 && taskid <= 1919) {
			presenceData.details = "62. Functions II";
			presenceData.state = `${statee}(Page ${taskid - 1914} of 5)`;
		} else if (taskid >= 1920 && taskid <= 1923) {
			presenceData.details = "63. Exceptions";
			presenceData.state = `${statee}(Page ${taskid - 1919} of 4)`;
		} else if (taskid >= 1924 && taskid <= 1930) {
			presenceData.details = "64. Intro to async await";
			presenceData.state = `${statee}(Page ${taskid - 1923} of 7)`;
		} else if (taskid >= 1931 && taskid <= 1939) {
			presenceData.details = "65. Awaiting promises";
			presenceData.state = `${statee}(Page ${taskid - 1930} of 9)`;
		} else if (taskid >= 1940 && taskid <= 1945) {
			presenceData.details = "66. Handle rejected awaits";
			presenceData.state = `${statee}(Page ${taskid - 1939} of 6)`;
		} else if (taskid >= 1946 && taskid <= 1953) {
			presenceData.details = "67. Package managers";
			presenceData.state = `${statee}(Page ${taskid - 1945} of 8)`;
		} else if (taskid >= 1954 && taskid <= 1958) {
			presenceData.details = "68. Module bundlers";
			presenceData.state = `${statee}(Page ${taskid - 1953} of 5)`;
		} else if (taskid >= 1959 && taskid <= 1964) {
			presenceData.details = "69. Advanced imports";
			presenceData.state = `${statee}(Page ${taskid - 1958} of 5)`;
		} else if (taskid >= 1965 && taskid <= 1968) {
			presenceData.details = "70. EcmaScript";
			presenceData.state = `${statee}(Page ${taskid - 1964} of 4)`;
		} else if (taskid >= 1969 && taskid <= 1973) {
			presenceData.details = "71. Legacy var";
			presenceData.state = `${statee}(Page ${taskid - 1968} of 5)`;
		} else if (taskid >= 1974 && taskid <= 1976) {
			presenceData.details = "72. Window object";
			presenceData.state = `${statee}(Page ${taskid - 1973} of 3)`;
		} else if (taskid >= 1977 && taskid <= 1981) {
			presenceData.details = "73. Closures";
			presenceData.state = `${statee}(Page ${taskid - 1976} of 5)`;
		} else if (taskid >= 1982 && taskid <= 1990) {
			presenceData.details = "74. Loops & iterations";
			presenceData.state = `${statee}(Page ${taskid - 1981} of 9)`;
		} else if (taskid >= 1991 && taskid <= 1995) {
			presenceData.details = "75. The event loop";
			presenceData.state = `${statee}(Page ${taskid - 1990} of 5)`;
		} else if (taskid >= 1996 && taskid <= 2016) {
			presenceData.details = "76. Multi-Step Final Project";
			presenceData.state = `${statee}(Page ${taskid - 1995} of 21)`;
		} else if (taskid >= 2017 && taskid <= 2030) {
			presenceData.details = "77. Optional: Intro to Web Components";
			presenceData.state = `${statee}(Page ${taskid - 2016} of 14)`;
		} else if (taskid >= 2031 && taskid <= 2044) {
			presenceData.details = "78. Optional: Intro to Lit";
			presenceData.state = `${statee}(Page ${taskid - 2030} of 14)`;
		}
	}

	if (presenceData.details) presence.setActivity(presenceData);
	else presence.setActivity();
});
