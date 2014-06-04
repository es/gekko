#Gekko - Market Visualizer

[Gekko][1] is a market share visualization app written with [D3][2]'s Treemap, [Highstocks][3], & [AngularJS][4]. It allows you to see the size of market sectors and how they change through time.

**The subsectors are clickable!** When you click on one, a dialog with each related subsector and their prices will appear. Within this same dialog you can compare non-related sectors to each other.

## Backend
The data for the treemap as well as the Highstock comparison is being served by an API written in Node.js. The code for that API can be found here: [gekko-backend][5].


## Development
After installing client libraries go into the highcharts directory and change `highcharts.src.js` to `highstock.src.js` under main. Then make sure that the appropiate files are loaded in index. 

### Libraries
- [D3][6]
- [Highstocks][7] 
- [highcharts-ng][8]
- [AngularJS][9]
- [AngularUI][10]
- [Bootstrap][11]
- [D3 Tip][12]
- [Font Awesome][13]
- [Brick Fonts][14] 


  [1]: http://emils.github.io/gekko/
  [2]: https://github.com/mbostock/d3
  [3]: https://github.com/highslide-software/highcharts.com
  [4]: https://github.com/angular/angular.js
  [5]: https://github.com/EmilS/gekko-backend
  [6]: https://github.com/mbostock/d3
  [7]: https://github.com/highslide-software/highcharts.com
  [8]: https://github.com/pablojim/highcharts-ng
  [9]: https://github.com/angular/angular.js
  [10]: http://angular-ui.github.io/
  [11]: http://getbootstrap.com/
  [12]: https://github.com/Caged/d3-tip
  [13]: http://fortawesome.github.io/Font-Awesome/
  [14]: http://brick.im/