const { response } = require('express');

const Income = require('../models/income');

const getIncomes = async(req, res = response) => {
    const uid = req.params.uid;
    
    try {
        const incomes = await Income.find({ uid: uid })
        res.json({
            ok: true,
            incomes
        })
    } catch (error) {
        console.log(error);
        res.json({
            ok: true,
            msg: 'Hable con el administrador'
        })
    }
}

const getIncomeById = async(req, res = response) => {
    const id = req.params.id;
    try {
        const income = await Income.findById(id)
        res.json({
            ok: true,
            income
        })
    } catch (error) {
        console.log(error);
        res.json({
            ok: true,
            msg: 'Hable con el administrador'
        })
    }
}

const crearIncome = async (req, resp = response) => {
    const uid = req.uid;
    const income = new Income({
        usuario: uid,
        ...req.body
    });
     income.createAt= new Date()
    try {
        const incomeDB = await income.save();
        resp.json({
            ok: true,
            income: incomeDB
        })

    } catch (error) {
        console.log(error);
        resp.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }
}

const actualizarIncome = async(req, res = response) => {
    const id  = req.params.id;
    const uid = req.uid;
    try {
        const income = await Income.findById( id );
        if ( !income ) {
            return res.status(404).json({
                ok: true,
                msg: 'Income no encontrado por id',
            });
        }
        const cambiosIncome = {
            ...req.body,
            usuario: uid
        }
        const incomeActualizado = await Income.findByIdAndUpdate( id, cambiosIncome, { new: true } );
        res.json({
            ok: true,
            income: incomeActualizado
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }
}

const borrarIncome = async (req, res = response) => {
    const id  = req.params.id;
    try {
        const income = await Income.findById( id );
        if ( !income ) {
            return res.status(404).json({
                ok: true,
                msg: 'Income no encontrado por id',
            });
        }
        await Income.findByIdAndDelete( id );
        res.json({
            ok: true,
            msg: 'Médico borrado'
        }); 
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }
}

module.exports = {
    getIncomes,
    crearIncome,
    actualizarIncome,
    borrarIncome,
    getIncomeById
}