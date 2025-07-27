// Simple Issue Tracker Dashboard
const { useState } = React;

// Dummy issue data; in a real application this would come from an API
const issues = [
  { id: 1, project: 'Alpha', title: 'Fix login bug', status: 'Open' },
  { id: 2, project: 'Alpha', title: 'Improve performance', status: 'In Progress' },
  { id: 3, project: 'Beta', title: 'Design new logo', status: 'Open' },
  { id: 4, project: 'Gamma', title: 'Write documentation', status: 'Closed' },
  { id: 5, project: 'Beta', title: 'Add new feature', status: 'Open' },
  { id: 6, project: 'Gamma', title: 'Refactor codebase', status: 'In Progress' }
];

// Compute counts per project
function getProjectCounts(data) {
  return data.reduce((acc, issue) => {
    acc[issue.project] = (acc[issue.project] || 0) + 1;
    return acc;
  }, {});
}

function Dashboard() {
  const [selectedProject, setSelectedProject] = useState(null);
  const counts = getProjectCounts(issues);
  const projects = Object.keys(counts);
  const filteredIssues = selectedProject
    ? issues.filter((i) => i.project === selectedProject)
    : [];

  return (
    React.createElement('div', { className: 'dashboard' }, [
      React.createElement('h1', { key: 'title' }, 'Issue Tracker Dashboard'),
      React.createElement(
        'table',
        { key: 'table', className: 'project-table' },
        [
          React.createElement(
            'thead',
            { key: 'thead' },
            React.createElement(
              'tr',
              null,
              [
                React.createElement('th', { key: 'proj' }, 'Project'),
                React.createElement('th', { key: 'count' }, 'Issue Count')
              ]
            )
          ),
          React.createElement(
            'tbody',
            { key: 'tbody' },
            projects.map((project) =>
              React.createElement(
                'tr',
                {
                  key: project,
                  onClick: () => setSelectedProject(project),
                  className: selectedProject === project ? 'active' : ''
                },
                [
                  React.createElement('td', { key: 'name' }, project),
                  React.createElement('td', { key: 'count' }, counts[project])
                ]
              )
            )
          )
        ]
      ),
      selectedProject &&
        React.createElement(
          'div',
          { key: 'issues', className: 'issues-list' },
          [
            React.createElement('h2', { key: 'subtitle' }, `${selectedProject} Issues`),
            React.createElement(
              'ul',
              { key: 'list' },
              filteredIssues.map((issue) =>
                React.createElement(
                  'li',
                  { key: issue.id },
                  `${issue.title} (${issue.status})`
                )
              )
            )
          ]
        )
    ])
  );
}

ReactDOM.render(React.createElement(Dashboard), document.getElementById('root'));