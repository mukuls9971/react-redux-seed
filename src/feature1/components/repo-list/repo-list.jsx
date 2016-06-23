import React from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';

import s from './repo-list.css';

let RepoList = ({repos}) => (
    <table  className={classNames(s.repoList, 'mintable')}>
        <thead>
        <tr>
            <th>Repository</th>
            <th className="pull-right">Stars</th>
            <th className="pull-right">Forks</th>
        </tr>
        </thead>
        <tbody>
        {
            repos.map(repo => (
                <tr key={repo.name}>
                    <td>{repo.name}</td>
                    <td className="pull-right">{repo.stargazers_count}</td>
                    <td className="pull-right">{repo.forks_count}</td>
                </tr>
            ))
        }
        </tbody>
        <tfoot>
        <tr>
            <td colSpan="3"><em>{repos.length} repositories retrieved</em></td>
        </tr>
        </tfoot>
    </table>
);

RepoList.propTypes = {
    repos: React.PropTypes.array
};

const mapStateToProps = (state) => {

    let feature1 = state.feature1;

    return {
        repos: feature1.repos
    }
};

RepoList = connect(
    mapStateToProps
)(RepoList);

export default RepoList;
