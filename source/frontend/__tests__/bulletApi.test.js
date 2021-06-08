import { login } from '../src/js/api/user'
import { addBullet, deleteBullet, editBullet, updateSorting, getBulletsByDay, getJournals } from '../src/js/api/journal'

test('Test1: Get Journals', async () => {
    var header = {
        headers: {
            Authorization: await login('e@gmail.com', 'asd'),
            'Content-Type': 'application/json'
        }
    }

    let res = await getJournals(header)
    expect(res[0].id).toBe("7")
}, 20000);

test('Test2: Create bullet', async () => {
    var header = {
        headers: {
            Authorization: await login('e@gmail.com', 'asd'),
            'Content-Type': 'application/json'
        }
    }

    let res = await addBullet(
        {
            "journalId": 7,
            "body": "JESTING",
            "type": "task",
            "priority": 2,
            "mood": 1,
            "date": "2069-01-04"
        },
        header
    )
    // expect(res.id).not.toBe(null);
    const date = new Date("2069-01-04")
    date.setDate(date.getDate() + 1)
    res = await updateSorting(7, date, [res.id], header)
    expect(res).toBe('success')
}, 20000);

test('Test3: Fetch bullet', async () => {
    var header = {
        headers: {
            Authorization: await login('e@gmail.com', 'asd'),
            'Content-Type': 'application/json'
        }
    }
    const date = new Date("2069-01-04")
    date.setDate(date.getDate() + 1)
    let res = await getBulletsByDay(
        7,
        date,
        header
    )
    expect(res[0].body).toBe('JESTING');
});

test('Test4: Edit bullet', async () => {
    var header = {
        headers: {
            Authorization: await login('e@gmail.com', 'asd'),
            'Content-Type': 'application/json'
        }
    }
    const date = new Date("2069-01-04")
    date.setDate(date.getDate() + 1)

    await editBullet(
        {
            "id": (await getBulletsByDay(
                7,
                date,
                header
            ))[0].id,
            "journalId": 7,
            "body": "jesting changed",
            "type": "task",
            "priority": 2,
            "mood": 1,
            "date": "2069-01-04"
        },
        header
    );
    expect(true).toBe(true)

});

test('Test5: Verify Edited bullet is Saved', async () => {
    var header = {
        headers: {
            Authorization: await login('e@gmail.com', 'asd'),
            'Content-Type': 'application/json'
        }
    }
    const date = new Date("2069-01-04")
    date.setDate(date.getDate() + 1)
    let res = await getBulletsByDay(
        7,
        date,
        header
    )
    expect(res[0].body).toBe('jesting changed');
});

test('Test6: Delete Bullet', async () => {
    var header = {
        headers: {
            Authorization: await login('e@gmail.com', 'asd'),
            'Content-Type': 'application/json'
        }
    }
    const date = new Date("2069-01-04")
    date.setDate(date.getDate() + 1)
    let res = await getBulletsByDay(
        7,
        date,
        header
    )
    expect(res[0].body).toBe('jesting changed');

    await deleteBullet(res[0].id, header)
    await updateSorting(7, date, [], header)
});

test('Test7: Verify Bullet is Deleted', async () => {
    var header = {
        headers: {
            Authorization: await login('e@gmail.com', 'asd'),
            'Content-Type': 'application/json'
        }
    }
    const date = new Date("2069-01-04")
    date.setDate(date.getDate() + 1)
    let res = await getBulletsByDay(
        7,
        date,
        header
    )
    expect(res.length).toBe(0);
});
