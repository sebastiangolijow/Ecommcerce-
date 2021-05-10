import React, { Component } from 'react';
import swal from "sweetalert";
import style from './Game.module.scss'

export function Game() {

    function clearPlayer() {
        game.player = [];
    }

    function addToPlayer(id) {
        var field = "#" + id
        console.log(field);
        game.player.push(field);
        playerTurn(field);
    }

    function playerTurn(x) {
        if (game.player[game.player.length - 1] !== game.currentGame[game.player.length - 1]) {
            if (game.strict) {
                alert('Try again! ...From scratch!');
                newGame();
            } else {
                alert('Wrong move! Try again!');
                showMoves();
            }
        } else {
            console.log('Good Move!');
            sound(x);
            var check = game.player.length === game.currentGame.length;
            if (check) {
                if (game.count == 20) {
                    alert('You won! Congrats.');
                } else {
                    alert('Next round!');
                    nextLevel();
                }
            }
        }
    }

    function showMoves() {
        var i = 0;
        var moves = setInterval(function () {
            playGame(game.currentGame[i]);
            i++;
            if (i >= game.currentGame.length) {
                clearInterval(moves);
            }
        }, 600)

        clearPlayer();
    }

    function playGame(field) {
        $(field).addClass('hover');
        sound(field);
        setTimeout(function () {
            $(field).removeClass('hover');
        }, 300);
    }

    function generateMove() {
        game.currentGame.push(game.possibilities[(Math.floor(Math.random() * 4))]);
        showMoves();
    }

    function newGame() {
        clearGame();
    }

    function clearGame() {
        game.currentGame = [];
        game.count = 0;
        addCount();
    }

    function addCount() {
        game.count++;
        $('#clickNumber').addClass('animated fadeOutDown');

        setTimeout(function () {
            $('#clickNumber').removeClass('fadeOutDown').html(game.count).addClass('fadeInDown');
        }, 200);

        generateMove();
    }

    return (
        <div class="row">
            <div class="col-md-12">
                <div class="gamefield">
                    <div class="btn-sett" data-toggle="modal" data-target="#myModal">
                        <h5>Settings</h5>
                    </div>
                    <div class="top-row">
                        <div id="blue" class="gamebutton" onClick="addToPlayer(this.id)"></div>
                    </div>
                    <div class="middle-row">
                        <div id="green" class="gamebutton" onClick="addToPlayer(this.id)"></div>
                        <div id="gameNumber">
                            <h2 id="clickNumber">0</h2></div>
                        <div id="red" class="gamebutton" onClick="addToPlayer(this.id)"></div>
                    </div>
                    <div class="bottom-row">
                        <div id="dark" class="gamebutton" onClick="addToPlayer(this.id)"></div>
                        <div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}