#!/usr/bin/env node

var f = require('util').format;
var fs = require('fs');
var groups = require('loopback-owners');
var path = require('path');

var filePath = path.resolve(process.cwd() + '/owners.md');

fs.access(filePath, fs.F_OK, function(err) {
  if (!err)
    fs.truncateSync(filePath, 0);

  // print generation info
  var info = '> This file was generated via [`lat-owners`](//github.com/' +
    'strongloop/loopback-admin-tools#lat-owners)';
  fs.appendFileSync(filePath, info);

  groups.forEach(function(group, index) {
    // print title
    // var title = '';
    // if (index !== 0)
    //   title += '\n\n'
    var title = '\n\n# ' + group.name;
    fs.appendFileSync(filePath, title);

    if (group.subgroups) {
      group.subgroups.forEach(function(subgroup) {
        // print subgroup title
        var subgroupTitle = '';
        subgroupTitle += '\n\n## ' + subgroup.name;
        fs.appendFileSync(filePath, subgroupTitle);

        // print table header
        var tableHeader = '\n\n<table>\n  <thead>\n    <tr>\n      ' +
          '<th width="100%" align="left">Repo\n      <th>Owner\n      ' +
          '<th>Backup';
        fs.appendFileSync(filePath, tableHeader);

        // print table body
        var tableBody = '\n  <tbody>';
        fs.appendFileSync(filePath, tableBody);

        // print subgroup rows
        if (typeof subgroup.repos === 'string')
          subgroup.repos = [subgroup.repos];
        subgroup.repos && subgroup.repos.forEach(function(repo, index) {
          var row = '\n    <tr>'

          // add repo link
          row += f('<td><a href="//github.com/%s">%s</a>',
            repo, repo.split('/').pop());

          if (index === 0) {
            // add owner
            row += f('\n        <td rowspan="%s" align="center">',
              subgroup.repos.length);
            if (typeof subgroup.owner === 'string')
              subgroup.owner = [subgroup.owner];
            subgroup.owner && subgroup.owner.forEach(function(owner, index) {
              if (index !== 0)
                row += '<br>'
              row += owner;
            });

            // add backup
            row += f('\n        <td rowspan="%s" align="center">',
              subgroup.repos.length);
            if (typeof subgroup.backup === 'string')
              subgroup.backup = [subgroup.backup];
            subgroup.backup && subgroup.backup.forEach(function(backup, index) {
              if (index !== 0)
                row += '<br>'
              row += backup;
            });
          }

          fs.appendFileSync(filePath, row);
        });

        // print table footer
        fs.appendFileSync(filePath, '\n</table>');
      });
    } else {
      // print table header
      var tableHeader = '\n\n<table>\n  <thead>\n    <tr>\n      ' +
        '<th width="100%" align="left">Repo\n      <th>Owner\n      ' +
        '<th>Backup';
      fs.appendFileSync(filePath, tableHeader);

      // print table body
      var tableBody = '\n  <tbody>';
      fs.appendFileSync(filePath, tableBody);

      // print repo rows
      if (typeof group.repos === 'string')
        group.repos = [group.repos];
      group.repos && group.repos.forEach(function(repo, index) {
        var row = '\n    <tr>'

        // add repo link
        row += f('<td><a href="//github.com/%s">%s</a>',
          repo, repo.split('/').pop());

        if (index === 0) {
          // add owner
          row += f('\n        <td rowspan="%s" align="center">',
            group.repos.length);
          if (typeof group.owner === 'string')
            group.owner = [group.owner];
          group.owner && group.owner.forEach(function(owner, index) {
            if (index !== 0)
              row += '<br>'
            row += owner;
          });

          // add backup
          row += f('\n        <td rowspan="%s" align="center">',
            group.repos.length);
          if (typeof group.backup === 'string')
            group.backup = [group.backup];
          group.backup && group.backup.forEach(function(backup, index) {
            if (index !== 0)
              row += '<br>'
            row += backup;
          });
        }

        fs.appendFileSync(filePath, row);
      });

      // print table footer
      fs.appendFileSync(filePath, '\n</table>');
    }
  });

  // to suppress git diff regarding no newline at EOF
  fs.appendFileSync(filePath, '\n\n');
});
