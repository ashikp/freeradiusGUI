-- Create radacct table
CREATE TABLE IF NOT EXISTS radacct (
    radacctid INTEGER PRIMARY KEY AUTOINCREMENT,
    acctsessionid VARCHAR(64) NOT NULL,
    acctuniqueid VARCHAR(32) NOT NULL,
    username VARCHAR(64) NOT NULL,
    groupname VARCHAR(64),
    realm VARCHAR(64),
    nasipaddress VARCHAR(15) NOT NULL,
    nasportid VARCHAR(15),
    nasporttype VARCHAR(32),
    acctstarttime DATETIME,
    acctupdatetime DATETIME,
    acctstoptime DATETIME,
    acctinterval INTEGER,
    acctsessiontime INTEGER UNSIGNED,
    acctauthentic VARCHAR(32),
    connectinfo_start VARCHAR(50),
    connectinfo_stop VARCHAR(50),
    acctinputoctets BIGINT,
    acctoutputoctets BIGINT,
    calledstationid VARCHAR(50) NOT NULL,
    callingstationid VARCHAR(50) NOT NULL,
    acctterminatecause VARCHAR(32) NOT NULL,
    servicetype VARCHAR(32),
    framedprotocol VARCHAR(32),
    framedipaddress VARCHAR(15),
    UNIQUE(acctuniqueid)
);

-- Create radcheck table
CREATE TABLE IF NOT EXISTS radcheck (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username VARCHAR(64) NOT NULL DEFAULT '',
    attribute VARCHAR(64) NOT NULL DEFAULT '',
    op CHAR(2) NOT NULL DEFAULT '==',
    value VARCHAR(253) NOT NULL DEFAULT '',
    UNIQUE(username, attribute)
);

-- Create radgroupcheck table
CREATE TABLE IF NOT EXISTS radgroupcheck (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    groupname VARCHAR(64) NOT NULL DEFAULT '',
    attribute VARCHAR(64) NOT NULL DEFAULT '',
    op CHAR(2) NOT NULL DEFAULT '==',
    value VARCHAR(253) NOT NULL DEFAULT '',
    UNIQUE(groupname, attribute)
);

-- Create radgroupreply table
CREATE TABLE IF NOT EXISTS radgroupreply (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    groupname VARCHAR(64) NOT NULL DEFAULT '',
    attribute VARCHAR(64) NOT NULL DEFAULT '',
    op CHAR(2) NOT NULL DEFAULT '=',
    value VARCHAR(253) NOT NULL DEFAULT '',
    UNIQUE(groupname, attribute)
);

-- Create radreply table
CREATE TABLE IF NOT EXISTS radreply (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username VARCHAR(64) NOT NULL DEFAULT '',
    attribute VARCHAR(64) NOT NULL DEFAULT '',
    op CHAR(2) NOT NULL DEFAULT '=',
    value VARCHAR(253) NOT NULL DEFAULT '',
    UNIQUE(username, attribute)
);

-- Create radusergroup table
CREATE TABLE IF NOT EXISTS radusergroup (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username VARCHAR(64) NOT NULL DEFAULT '',
    groupname VARCHAR(64) NOT NULL DEFAULT '',
    priority INTEGER NOT NULL DEFAULT 1,
    UNIQUE(username, groupname)
);

-- Create radpostauth table
CREATE TABLE IF NOT EXISTS radpostauth (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username VARCHAR(64) NOT NULL,
    pass VARCHAR(64),
    reply VARCHAR(32),
    authdate DATETIME NOT NULL
);

-- Create nas table
CREATE TABLE IF NOT EXISTS nas (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nasname VARCHAR(128) NOT NULL,
    shortname VARCHAR(32),
    type VARCHAR(30) DEFAULT 'other',
    ports INTEGER,
    secret VARCHAR(60) NOT NULL DEFAULT 'secret',
    server VARCHAR(64),
    community VARCHAR(50),
    description VARCHAR(200) DEFAULT 'RADIUS Client',
    UNIQUE(nasname)
);

-- Create indexes
CREATE INDEX IF NOT EXISTS radacct_username_idx ON radacct (username);
CREATE INDEX IF NOT EXISTS radacct_acctsessionid_idx ON radacct (acctsessionid);
CREATE INDEX IF NOT EXISTS radacct_acctsessiontime_idx ON radacct (acctsessiontime);
CREATE INDEX IF NOT EXISTS radacct_acctstarttime_idx ON radacct (acctstarttime);
CREATE INDEX IF NOT EXISTS radacct_acctinterval_idx ON radacct (acctinterval);
CREATE INDEX IF NOT EXISTS radacct_acctstoptime_idx ON radacct (acctstoptime);
CREATE INDEX IF NOT EXISTS radacct_nasipaddress_idx ON radacct (nasipaddress);

CREATE INDEX IF NOT EXISTS radcheck_username_idx ON radcheck (username);
CREATE INDEX IF NOT EXISTS radgroupcheck_groupname_idx ON radgroupcheck (groupname);
CREATE INDEX IF NOT EXISTS radgroupreply_groupname_idx ON radgroupreply (groupname);
CREATE INDEX IF NOT EXISTS radreply_username_idx ON radreply (username);
CREATE INDEX IF NOT EXISTS radusergroup_username_idx ON radusergroup (username);
CREATE INDEX IF NOT EXISTS radusergroup_groupname_idx ON radusergroup (groupname);
CREATE INDEX IF NOT EXISTS radpostauth_username_idx ON radpostauth (username);
CREATE INDEX IF NOT EXISTS radpostauth_authdate_idx ON radpostauth (authdate);
CREATE INDEX IF NOT EXISTS nas_nasname_idx ON nas (nasname); 