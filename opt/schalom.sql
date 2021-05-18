-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Erstellungszeit: 18. Mai 2021 um 10:09
-- Server-Version: 10.4.17-MariaDB
-- PHP-Version: 8.0.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Datenbank: `schalom`
--

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `economy`
--

CREATE TABLE `economy` (
  `id` int(11) NOT NULL,
  `userID` varchar(20) NOT NULL,
  `money` varchar(255) NOT NULL DEFAULT '0',
  `bank` varchar(255) NOT NULL DEFAULT '0',
  `house` varchar(255) NOT NULL DEFAULT '0',
  `car` varchar(255) NOT NULL DEFAULT '0',
  `rank` enum('None','Premium','VIP') NOT NULL DEFAULT 'None',
  `beg` varchar(255) DEFAULT NULL,
  `daily` varchar(255) DEFAULT NULL,
  `weekly` varchar(255) DEFAULT NULL,
  `work` varchar(255) DEFAULT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Daten für Tabelle `economy`
--

INSERT INTO `economy` (`id`, `userID`, `money`, `bank`, `house`, `car`, `rank`, `beg`, `daily`, `weekly`, `work`, `created_at`, `updated_at`) VALUES
(1, '350618993020764161', '1050', '0', '0', '0', 'None', NULL, NULL, NULL, NULL, '2021-05-18 08:48:52', '2021-05-18 10:00:40'),
(2, '788665432017469452', '0', '0', '0', '0', 'None', NULL, NULL, NULL, NULL, '2021-05-18 08:49:06', '2021-05-18 08:49:06'),
(3, '316261977645383690', '0', '0', '0', '0', 'None', NULL, NULL, NULL, NULL, '2021-05-18 08:49:19', '2021-05-18 08:49:19'),
(4, '718903311578824815', '0', '0', '0', '0', 'None', NULL, NULL, NULL, NULL, '2021-05-18 08:50:08', '2021-05-18 08:50:08'),
(5, '655181254412730420', '0', '0', '0', '0', 'None', NULL, NULL, NULL, NULL, '2021-05-18 08:50:44', '2021-05-18 08:50:44'),
(6, '483206970799816704', '0', '0', '0', '0', 'None', NULL, NULL, NULL, NULL, '2021-05-18 08:50:50', '2021-05-18 08:50:50'),
(7, '248104216030216192', '0', '0', '0', '0', 'None', NULL, NULL, NULL, NULL, '2021-05-18 08:50:57', '2021-05-18 08:50:57'),
(8, '472443092515946512', '0', '0', '0', '0', 'None', NULL, NULL, NULL, NULL, '2021-05-18 08:51:31', '2021-05-18 08:51:31'),
(9, '594094013234020353', '0', '0', '0', '0', 'None', NULL, NULL, NULL, NULL, '2021-05-18 08:51:46', '2021-05-18 08:51:46'),
(10, '758766185411248218', '0', '0', '0', '0', 'None', NULL, NULL, NULL, NULL, '2021-05-18 08:52:34', '2021-05-18 08:52:34');

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `server`
--

CREATE TABLE `server` (
  `id` int(11) NOT NULL,
  `guildID` varchar(20) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Daten für Tabelle `server`
--

INSERT INTO `server` (`id`, `guildID`, `created_at`, `updated_at`) VALUES
(1, '836883600321675284', '2021-05-03 10:16:19', '2021-05-03 10:16:41');

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `settings`
--

CREATE TABLE `settings` (
  `id` int(11) NOT NULL,
  `prefix` varchar(255) NOT NULL DEFAULT 'pp!'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Daten für Tabelle `settings`
--

INSERT INTO `settings` (`id`, `prefix`) VALUES
(1, 'pp!');

--
-- Indizes der exportierten Tabellen
--

--
-- Indizes für die Tabelle `economy`
--
ALTER TABLE `economy`
  ADD PRIMARY KEY (`id`);

--
-- Indizes für die Tabelle `server`
--
ALTER TABLE `server`
  ADD PRIMARY KEY (`id`);

--
-- Indizes für die Tabelle `settings`
--
ALTER TABLE `settings`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT für exportierte Tabellen
--

--
-- AUTO_INCREMENT für Tabelle `economy`
--
ALTER TABLE `economy`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT für Tabelle `server`
--
ALTER TABLE `server`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT für Tabelle `settings`
--
ALTER TABLE `settings`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
