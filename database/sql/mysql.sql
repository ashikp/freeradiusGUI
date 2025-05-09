-- Create radacct table
CREATE TABLE IF NOT EXISTS radacct (
    radacctid BIGINT PRIMARY KEY AUTO_INCREMENT,
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
    acctinterval INT,
    acctsessiontime INT UNSIGNED,
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
    UNIQUE KEY acctuniqueid (acctuniqueid)
) ENGINE = InnoDB;

-- Create radcheck table
CREATE TABLE IF NOT EXISTS radcheck (
    id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(64) NOT NULL DEFAULT '',
    attribute VARCHAR(64) NOT NULL DEFAULT '',
    op CHAR(2) NOT NULL DEFAULT '==',
    value VARCHAR(253) NOT NULL DEFAULT '',
    UNIQUE KEY username_attribute (username, attribute)
) ENGINE = InnoDB;

-- Create radgroupcheck table
CREATE TABLE IF NOT EXISTS radgroupcheck (
    id INT PRIMARY KEY AUTO_INCREMENT,
    groupname VARCHAR(64) NOT NULL DEFAULT '',
    attribute VARCHAR(64) NOT NULL DEFAULT '',
    op CHAR(2) NOT NULL DEFAULT '==',
    value VARCHAR(253) NOT NULL DEFAULT '',
    UNIQUE KEY groupname_attribute (groupname, attribute)
) ENGINE = InnoDB;

-- Create radgroupreply table
CREATE TABLE IF NOT EXISTS radgroupreply (
    id INT PRIMARY KEY AUTO_INCREMENT,
    groupname VARCHAR(64) NOT NULL DEFAULT '',
    attribute VARCHAR(64) NOT NULL DEFAULT '',
    op CHAR(2) NOT NULL DEFAULT '=',
    value VARCHAR(253) NOT NULL DEFAULT '',
    UNIQUE KEY groupname_attribute (groupname, attribute)
) ENGINE = InnoDB;

-- Create radreply table
CREATE TABLE IF NOT EXISTS radreply (
    id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(64) NOT NULL DEFAULT '',
    attribute VARCHAR(64) NOT NULL DEFAULT '',
    op CHAR(2) NOT NULL DEFAULT '=',
    value VARCHAR(253) NOT NULL DEFAULT '',
    UNIQUE KEY username_attribute (username, attribute)
) ENGINE = InnoDB;

-- Create radusergroup table
CREATE TABLE IF NOT EXISTS radusergroup (
    id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(64) NOT NULL DEFAULT '',
    groupname VARCHAR(64) NOT NULL DEFAULT '',
    priority INT NOT NULL DEFAULT 1,
    UNIQUE KEY username_groupname (username, groupname)
) ENGINE = InnoDB;

-- Create radpostauth table
CREATE TABLE IF NOT EXISTS radpostauth (
    id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(64) NOT NULL,
    pass VARCHAR(64),
    reply VARCHAR(32),
    authdate DATETIME NOT NULL
) ENGINE = InnoDB;

-- Create nas table
CREATE TABLE IF NOT EXISTS nas (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nasname VARCHAR(128) NOT NULL,
    shortname VARCHAR(32),
    type VARCHAR(30) DEFAULT 'other',
    ports INT,
    secret VARCHAR(60) NOT NULL DEFAULT 'secret',
    server VARCHAR(64),
    community VARCHAR(50),
    description VARCHAR(200) DEFAULT 'RADIUS Client',
    UNIQUE KEY nasname (nasname)
) ENGINE = InnoDB;

-- Create indexes
CREATE INDEX radacct_username_idx ON radacct (username);
CREATE INDEX radacct_acctsessionid_idx ON radacct (acctsessionid);
CREATE INDEX radacct_acctsessiontime_idx ON radacct (acctsessiontime);
CREATE INDEX radacct_acctstarttime_idx ON radacct (acctstarttime);
CREATE INDEX radacct_acctinterval_idx ON radacct (acctinterval);
CREATE INDEX radacct_acctstoptime_idx ON radacct (acctstoptime);
CREATE INDEX radacct_nasipaddress_idx ON radacct (nasipaddress);

CREATE INDEX radcheck_username_idx ON radcheck (username);
CREATE INDEX radgroupcheck_groupname_idx ON radgroupcheck (groupname);
CREATE INDEX radgroupreply_groupname_idx ON radgroupreply (groupname);
CREATE INDEX radreply_username_idx ON radreply (username);
CREATE INDEX radusergroup_username_idx ON radusergroup (username);
CREATE INDEX radusergroup_groupname_idx ON radusergroup (groupname);
CREATE INDEX radpostauth_username_idx ON radpostauth (username);
CREATE INDEX radpostauth_authdate_idx ON radpostauth (authdate);
CREATE INDEX nas_nasname_idx ON nas (nasname); 