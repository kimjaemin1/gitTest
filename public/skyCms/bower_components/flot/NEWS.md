## Flot 0.8.3 ##

### Changes ###

- Updated example code to avoid encouraging unnecessary re-plots.
  (patch by soenter, pull request #1221)

### Bug fixes ###

 - Added a work-around to disable the allocation of extra space for first and
   last axis ticks, allowing plots to span the full width of their container.
   A proper solution for this bug will be implemented in the 0.9 release.
   (reported by Josh Pigford and andig, issue #1212, pull request #1290)

 - Fixed a regression introduced in 0.8.1, where the last tick label would
   sometimes wrap rather than extending the plot's offset to create space.
   (reported by Elite Gamer, issue #1283)

 - Fixed a regression introduced in 0.8.2, where the resize plugin would use
   unexpectedly high amounts of CPU even when idle.
   (reported by tommie, issue #1277, pull request #1289)

 - Fixed the selection example to work with jQuery 1.9.x and later.
   (reported by EGLadona and dmfalke, issue #1250, pull request #1285)

 - Added a detach shim to fix support for jQuery versions earlier than 1.4.x.
   (reported by ngavard, issue #1240, pull request #1286)

 - Fixed a rare 'Uncaught TypeError' when using the resize plugin in IE 7/8.
   (reported by tleish, issue #1265, pull request #1289)

 - Fixed zoom constraints to apply only in the direction of the zoom.
   (patch by Neil Katin, issue #1204, pull request #1205)

 - Markings lines are no longer blurry when drawn on pixel boundaries.
   (reported by btccointicker and Rouillard, issue #1210)

 - Don't discard original pie data-series values when combining slices.
   (patch by Phil Tsarik, pull request #1238)

 - Fixed broken auto-scale behavior when using deprecated [x|y]2axis options.
   (reported by jorese, issue #1228, pull request #1284)

 - Exposed the dateGenerator function on the plot object, as it used to be
   before time-mode was moved into a separate plugin.
   (patch by Paolo Valleri, pull request #1028)


## Flot 0.8.2 ##

### Changes ###

 - Added a plot.destroy method as a way to free memory when emptying the plot
   placeholder and then re-using it for some other purpose.
   (patch by Thodoris Greasidis, issue #1129, pull request #1130)

 - Added a table of contents and PLUGINS link to the API documentation.
   (patches by Brian Peiris, pull requests #1064 and #1127)

 - Added Ruby code examples for time conversion.
   (patch by Mike Połtyn, pull request #1182)

 - Minor improvements to API.md and README.md.
   (patches by Patrik Ragnarsson, pull requests #1085 and #1086)

 - Updated inlined jQuery Resize to the latest version to fix errors.
   (reported by Matthew Sabol and sloker, issues #997 ad #1081)

### Bug fixes ###

 - Fixed an unexpected change in behavior that resulted in duplicate tick
   labels when using a plugin, like flot-tickrotor, that overrode tick labels.
   (patch by Mark Cote, pull request #1091)

 - Fixed a regression from 0.7 where axis labels were given the wrong width,
   causing them to overlap at certain scales and ignore the labelWidth option.
   (patch by Benjamin Gram, pull request #1177)

 - Fixed a bug where the second axis in an xaxes/yaxes array incorrectly had
   its 'innermost' property set to false or undefined, even if it was on the
   other side of the plot from the first axis. This resulted in the axis bar
   being visible when it shouldn't have been, which was especially obvious
   when the grid had a left/right border width of zero.
   (reported by Teq1, fix researched by ryleyb, issue #1056)

 - Fixed an error when using a placeholder that has no font-size property.
   (patch by Craig Oldford, pull request #1135)

 - Fixed a regression from 0.7 where nulls at the end of a series were ignored
   for purposes of determing the range of the x-axis.
   (reported by Munsifali Rashid, issue #1095)

 - If a font size is provided, base the default lineHeight on that size rather
   that the font size of the plot placeholder, which may be very different.
   (reported by Daniel Hoffmann Bernardes, issue #1131, pull request #1199)

 - Fix broken highlighting for right-aligned bars.
   (reported by BeWiBu and Mihai Stanciu, issues #975 and #1093, with further
   assistance by Eric Byers, pull request #1120)

 - Prevent white circles from sometimes showing up inside of pie charts.
   (reported by Pierre Dubois and Jack Klink, issues #1128 and #1073)

 - Label formatting no longer breaks when a page contains multiple pie charts.
   (reported by Brend Wanders, issue #1055)

 - When using multiple axes on opposite sides of the plot, the innermost axis
   coming later in the list no longer has its bar drawn incorrectly.
   (reported by ryleyb, issue #1056)

 - When removing series labels and redrawing the plot, the legend now updates
   correctly even when using an external container.
   (patch by Luis Silva, issue #1159, pull request #1160)

 - The pie plugin no longer ignores the value of the left offset option.
   (reported by melanker, issue #1136)

 - Fixed a regression from 0.7, where extra padding was added unnecessarily to
   sides of the plot where there was no last tick label.
   (reported by sknob001, issue #1048, pull request #1200)

 - Fixed incorrect tooltip behavior in the interacting example.
   (patch by cleroux, issue #686, pull request #1074)

 - Fixed an error in CSS color extraction with elements outside the DOM.
   (patch by execjosh, pull request #1084)

 - Fixed :not selector error when using jQuery without Sizzle.
   (patch by Anthony Ryan, pull request #1180)

 - Worked around a browser issue that caused bars to appear un-filled.
   (reported by irbian, issue #915)

## Flot 0.8.1 ##

### Bug fixes ###

 - Fixed a regression in the time plugin, introduced in 0.8, that caused dates
   to align to the minute rather than to the highest appropriate unit. This
   caused many x-axes in 0.8 to have different ticks than they did in 0.7.
   (reported by Tom Sheppard, patch by Daniel Shapiro, issue #1017, pull
   request #1023)

 - Fixed a regression in text rendering, introduced in 0.8, that caused axis
   labels with the same text as another label on the same axis to disappear.
   More generally, it's again possible to have the same text in two locations.
   (issue #1032)

 - Fixed a regression in text rendering, introduced in 0.8, where axis labels
   were no longer assigned an explicit width, and their text could not wrap.
   (reported by sabregreen, issue #1019)

 - Fixed a regression in the pie plugin, introduced in 0.8, that prevented it
   from accepting data in the format '[[x, y]]'.
   (patch by Nicolas Morel, pull request #1024)

 - The 'zero' series option and 'autoscale' format option are no longer
   ignored when the series contains a null value.
   (reported by Daniel Shapiro, issue #1033)

 - Avoid triggering the time-mode plugin exception when there are zero series.
   (reported by Daniel Rothig, patch by Mark Raymond, issue #1016)

 - When a